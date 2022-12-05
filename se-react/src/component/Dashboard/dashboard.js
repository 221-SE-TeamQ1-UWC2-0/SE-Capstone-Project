import "./dashboard.css";
import React, { useState, Component, useRef, useEffect } from "react";
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Calendar from 'react-calendar';
import './calendar.css'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geojson from "../map/MCP.json";
import 'bootstrap/dist/css/bootstrap.min.css'



import {
    MdCalendarToday,
    MdOutlineMap,
    MdSource,
    MdChatBubbleOutline,
    MdAddCircleOutline,
    MdNotifications,
    MdInfo,
    MdOutlineAddLocation,
} from "react-icons/md";

import {
    RiUser6Fill,
    RiUserLine,
    RiUserLocationLine,
    RiTruckLine,
} from "react-icons/ri";

import {
    FaUserCircle,
    FaPlus,
} from "react-icons/fa";
import axios from "axios";
/*-----------------------*/

const SideBarItem = ({ Item, page, href }) => {
    return (
        <a className="db-sidebar_link" href={href}>
            <div className="db-sidebar_item">
                {<Item className="db-sidebar_img" />}
                <h3>
                    {page}
                </h3>
            </div>
        </a>
    );
};
const Logo = () => {
    return (
        <div className="db-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" />
        </div>
    );
};
/*Check list*/
const checkList = ["2022-12-05", "Collect on Route B", "Die", "Draft SE", "Life"];
/*Table*/

const TodoList = [{ "date": "2022-12-05", content: "Collect on Route B" }]
for (const todo of TodoList) {
    checkList.push(todo.content)
}

/*
    Fetch to get user information
*/


async function Taskfetching() {
    let response = await axios.get('http://localhost:8000/api/task/')
    let posts = response.data
    const result = posts.map(value => {
        return {
            date: value.body.split('|')[0],
            content: value.body.split('|')[1],
        }
    })
    return result
}


function Dashboard() {
    /*Map*/
    //----------------------------------------------------------//
    const mapContainer = useRef()
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [106.68926, 10.7489933 ],
      zoom: 11,
    })
    for (const feature of geojson.features) {
      const el = document.createElement('div');
      el.className = 'marker';
    
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

    return () => map.remove()
  }, [])
    //----------------------------------------------------------//


    //Task-----------------------------------------------------//
    const [task, setTask] = useState([])   
    /*Checklist*/
    const [checked, setChecked] = useState([]);
    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };
    // Generate string of checked items 
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + " , " + item;
        })
        : "";
    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    const [user_json, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/')
            .then(res => setData(() => res.data))
            .catch(err => console.log(err))
    }, [user_json.length])

    for (let i = 0; i <= user_json.length - 1; i++) {
        // _status = "" ;
        // if (user_json[i]['status'] == 1){
        //     _status = "Available"
        // }
        // else if (user_json[i]['status'] == 0){
        //     _status = "On-going"
        // }
        // else{_status = "Inactive"}
        // var push_tmp = 
        // if (user_json[i]['staff_id'] != "COLLECTOR"){

        //     collector.rows.push(push_tmp);



        // }
    }
    const defaultdate = new Date();
    defaultdate.setHours(0, 0, 0, 0)
    const [date, setDate] = useState(defaultdate);

    const onChange = date => {
        setDate(date)
    }
    //----------------------------------------------------------//
    /*Return function*/
    return (
        <div className="db-container">
            <div className="db-sidebar">
                <div className="db-opt">
                    <a href="/dashboard"><div style={{ display: "flex", alignItems: "center", marginBottom: "0em" }}>
                        <Logo />
                        <div className="db-Logoname">
                            <h4>UWC 2.0</h4>
                            <p>BO interface</p>
                        </div>
                    </div></a>
                    <SideBarItem
                        Item={MdOutlineMap}
                        page="Map"
                        href="/map"
                    />
                    <SideBarItem
                        Item={MdChatBubbleOutline}
                        page="Inbox"
                        href="https://www.messenger.com"
                    />
                    <SideBarItem
                        Item={RiUserLine}
                        page="Collector"
                        href="/collector-info"
                    />
                    <SideBarItem
                        Item={RiUserLocationLine}
                        page="Janitor"
                        href="/janitor-info"
                    />
                    <SideBarItem
                        Item={RiTruckLine}
                        page="Vehicle"
                        href="/"
                    />
                    <SideBarItem
                        Item={MdOutlineAddLocation}
                        page="MCP"
                        href="/"
                    />
                </div>
                <hr></hr>
                <div className="db-overview">
                    <div style={{ display: 'flex', margin: '0em 1.5em' }}>
                        <h4 style={{ marginRight: '9em' }}>Overview</h4>
                        <MdAddCircleOutline style={{ marginTop: '.9em', fontSize: '25px', color: '#454545' }} />
                    </div>
                    <div style={{ marginLeft: '1.3em' }}>
                        <div className="db-taskovr">
                            <RiUser6Fill style={{ margin: '.8em 1em 0em 1em', fontSize: '25px', color: '#454545' }} />
                            <p>Available collector</p>
                            <h2 style={{ marginLeft: '-3.3em'}}>69/122</h2>
                        </div>
                        <div className="db-taskovr">
                            <RiUser6Fill style={{ margin: '.8em 1em 0em 1em', fontSize: '25px', color: '#454545' }} />
                            <p>Available janitor</p>
                            <h2 style={{ marginLeft: '-3.8em' }}>121/232</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="db-content">
                <div className="db-header">
                    <div style={{ float: 'left' }}>
                        <p>DASHBOARD</p>
                    </div>
                    <div style={{ float: 'right' }}>
                        <div className="db-headerstuff">
                            <a href="/map"><button className="db-addtaskbtn">
                                <FaPlus style={{ fontSize: '15px', color: 'white', float: 'left' }} />
                                <p style={{ fontSize: '15px', color: 'white', float: 'left', marginTop: '0em' }}>Set Route</p>
                            </button></a>
                            <button className="db-addtaskbtn">
                                <FaPlus style={{ fontSize: '15px', color: 'white', float: 'left' }} />
                                <p style={{ fontSize: '15px', color: 'white', float: 'left', marginTop: '0em' }}>Add task</p>
                            </button>
                            <MdInfo style={{ margin: '.25em .25em', fontSize: '25px', color: '#454545' }} />
                            <MdNotifications style={{ margin: '.25em .25em', fontSize: '25px', color: '#454545' }} />
                            <FaUserCircle style={{ margin: '.1em .25em', fontSize: '30px', color: '#acacac' }} />
                        </div>
                    </div>
                </div>
                <div className="db-main">
                    <div className="db-board">
                        <div className="db-upper">
                            <div className="db-map">
                                <a href="/map"><h4>Map</h4></a>
                                <div className="db-mapping">
                                    <div ref={mapContainer} style={{ width: "60em", height: "51em" }} />
                                </div>
                            </div>
                            <div className="db-calendar">
                                <div>
                                    <h4>Calendar</h4>
                                    <div className="db-calendaring">
                                        <Calendar onChange={onChange} value={date} />
                                        {/*{date.toLocaleDateString("en-GB")}*/}
                                        {/*{date.getTime()}*/}

                                    </div>
                                </div>
                                <div className="db-tasklist">
                                    <div className="db-checkList">
                                        <h4>Task list</h4>
                                        <div className="db-list-container">
                                            {task.map((item, index) => {
                                                // console.log(date)
                                                if (Date.parse(item.date + "T00:00") === date.getTime()) return <div key={index}>{item.content} </div>
                                                else return null
                                            })}
                                        </div>
                                    </div>
                                    <div className="db-checkedlist">
                                        <p>Liet ke task o day</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}
export default Dashboard;
