import React, { useRef, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import mapboxgl from "mapbox-gl"
// import the mapbox styles
// alternatively can use a link tag in the head of public/index.html
// see https://docs.mapbox.com/mapbox-gl-js/api/
import "mapbox-gl/dist/mapbox-gl.css"
import "./map.css"
import geojson from "./MCP.json";
import axios from "axios"
import MCPList from "../mcps/mcpList"


// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken ="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";



const Mapping = () => {
  const mapContainer = useRef()
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  const [listMCP, getMCPList] = useState([]);
  const [vehicleList, getVehicleList] = useState([]) 
  const [mcpList, setMCP] = useState(null);


  useEffect(() => {
      fetch('http://127.0.0.1:8000/api/vehicle/')
           .then(response => response.json())
           .then(result => getVehicleList(result))
           .catch(error => console.log(error))
  }, [vehicleList.length])
  
  var viewVehicleList = []
  for (let i = 0; i < vehicleList.length; i++){
    viewVehicleList.push(
      <option value="vehicle{vehicleList[i].id}">Vehicle{vehicleList[i].id}</option>
    )
  }
  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only rendered once
  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [106.68926, 10.7489933 ],
      zoom: 12.5,
    })
    
    
    //Get latlong when clicking on map
    var marker = new mapboxgl.Marker();
    function add_marker (event) {
      var coordinates = event.lngLat;
      console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      marker.setLngLat(coordinates).addTo(map);
      axios({
        url: 'http://localhost:8000/api/mcp/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          lat: coordinates.lat,
          long: coordinates.lng,
          capacity: Math.floor(Math.random()*101),
        }
      }).then(res => console.log(res.data)).catch(err => console.log(err))
    }
    map.on('click', add_marker);

    function viewMCPList(result){
      for (let i = 0; i < result.length; i++) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat([result[i].long, result[i].lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>MCP${result[i].id}</h3>
               <p>Capacity: ${result[i].capacity}</p>
               <p>Latitude: ${result[i].lat}</p>
               <p>Longtitude: ${result[i].long}</p>
               `
            )
        )
        .addTo(map);
      }
    }
    //Adding marker 
    /*const marker1 = new mapboxgl.Marker()
    .setLngLat([106.65815149483268, 10.770948414755182])
    .addTo(map);*/

    async function getMCPs(){
        let response = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/mcp/'
        }).then((response) => {
            viewMCPList(response.data);
            getMCPList(response.data)
            // console.log(response.data) 
            // return response.data;
        });
    } 
    getMCPs();
    
    // start and end point
    const start = [106.65815149483268, 10.770948414755182];  // Start point - GET from database
    const point = [106.6703210895497, 10.755718794189761];
    const coords = [ 106.6840721427908, 10.779540553081702 ]; // End point  - GET from database


    // only want to work with the map after it has fully loaded
    // if you try to add sources and layers before the map has loaded
    // things will not work properly

    // create a function to make a directions request



    async function getRoute(end) {
      // make a directions request using driving profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
      // add turn instructions here at the end
      const instructions = document.getElementById('instructions');
      const steps = data.legs[0].steps;

      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min </strong></p><ol>${tripInstructions}</ol>`;
    }



    /*Display at the same time when the map is rendered*/
    map.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Display start point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });

      

      // Display end point to the map
      map.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30'
        }
      });
      getRoute(coords);

      // this is where the code from the next step will go
    });
        

    /**
     * Event handler for defining what happens when a user clicks on the map
     * In this example, we are checking if the user has clicked on a bus route
     * If they have, we want to render a popup with the data for the selected
     * bus route
     * Else, do nothing
     */

    //Click on map the end point
    map.on('click', (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }
        ]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: coords
                  }
                }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      getRoute(coords);
    });

    // cleanup function to remove map on unmount
    return () => map.remove()
  }, [])

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  
  return(
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
      <a href="/map"><div id="setMCP">Back to map</div></a>
    </div>
  );
}
export default Mapping
