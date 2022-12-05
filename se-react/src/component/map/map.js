/*import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";
import geoJson from "./MCP.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Map = () => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106.6626, 10.7733 ],
      zoom: 11.5,
    });
    map.on("load", function () {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;

*/


import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import mapboxgl from "mapbox-gl"
// import the mapbox styles
// alternatively can use a link tag in the head of public/index.html
// see https://docs.mapbox.com/mapbox-gl-js/api/
import "mapbox-gl/dist/mapbox-gl.css"
import "./map.css"
import geojson from "./MCP.json";


// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken ="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";
/**
 * Our custom Popup component used to render a nicely styled
 * map popup with additional information about the
 * user's selected bus route
 */
const Popup = ({ routeName, routeNumber, city, type }) => (
  <div className="popup">
    <h3 className="route-name">{routeName}</h3>
    <div className="route-metric-row">
      <h4 className="row-title">Route #</h4>
      <div className="row-value">{routeNumber}</div>
    </div>
    <div className="route-metric-row">
      <h4 className="row-title">Route Type</h4>
      <div className="row-value">{type}</div>
    </div>
    <p className="route-city">Serves {city}</p>
  </div>
)



const Map = () => {
  const mapContainer = useRef()
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))

  

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
    

    //Adding marker 
    /*const marker1 = new mapboxgl.Marker()
    .setLngLat([106.65815149483268, 10.770948414755182])
    .addTo(map);*/
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
    
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
      )
      .addTo(map);
    }


    // start and end point
    const start = [106.65815149483268, 10.770948414755182];   // Start point - GET from database
    const coords = [ 106.6840721427908, 10.779540553081702 ]; // End point  - GET from database


    // only want to work with the map after it has fully loaded
    // if you try to add sources and layers before the map has loaded
    // things will not work properly
    //Old version--------------------------------------------------------------------------------------------------
    /*map.on("load", () => {
      // bus routes source
      // another example of using a geojson source
      // this time we are hitting an ESRI API that returns
      // data in the geojson format
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson
      map.addSource("bus-routes", {
        type: "geojson",
        data:
        { "type": "Feature",
        "properties": { "FID": 2, "LineAbbr": "2", "LineName": "200 SOUTH", "Frequency": "15", "RouteType": "Local", "City": "Salt Lake City", "County": "Salt Lake", "AvgBrd": 1432, "SHAPE_Length": 0.09996123182330087 },
        "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 106.65815149483268, 10.770948414755182 ], [ 106.65252642456261, 10.790188056776884 ] ] ] }
        }
       
      })

      // bus routes - line layer
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
      map.addLayer({
        id: "bus-routes-line",
        type: "line",
        source: "bus-routes",
        paint: {
          "line-color": "#4094ae",
          "line-width": 4,
        },
      })
    })*/
    //Old version--------------------------------------------------------------------------------------------------
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

  return(
    <div>
      <div className="map-holder">
        <form method='GET' class="pointing" action="">
          <h5><b>Please input the start and end MCP</b></h5>
          <input type="text" placeholder="Start point.." name="start"></input>
          <input type="text" placeholder="End point.." name="end"></input>
        </form>
      </div>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}

export default Map
