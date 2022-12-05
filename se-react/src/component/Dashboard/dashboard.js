import "./dashboard.css";
import React, { useState, Component, useRef, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Calendar from 'react-calendar';
import './calendar.css'
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geoJson from "../map/MCP.json";
import DataFetching from "./DataFetching";

import {
    MdCalendarToday,
    MdOutlineMap,
    MdSource,
    MdChatBubbleOutline,
    MdSettings,
    MdAddCircleOutline,
    MdNotifications,
    MdInfo,
} from "react-icons/md";

import {
    RiLoader2Fill,
    RiTimeLine,
    RiCheckboxCircleFill
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
// const currentDate = new Date();
// const dates = TodoList
//     .filter((bigN) => new Date(bigN.task) < currentDate)
//     .map((data) => {
//         return {
//             content: data.content,
//         }
//     });
// console.log(dates)


/*
    Fetch to get user information
*/

var collector = {
    columns: [
        {
            label: 'ID',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Status',
            field: 'first',
            sort: 'asc'
        },
        {
            label: 'Action',
            field: 'last',
            sort: 'asc'
        },
    ],
    rows: [
        // { id: "CO001", status: "Available", action: "Contact" },
        // { id: "CO002", status: "On-going", action: "Contact" },
        // { id: "CO003", status: "Inactive", action: "Contact" },
        // { id: "CO001", status: "Available", action: "Contact" },
        // { id: "CO002", status: "On-going", action: "Contact" },
        // { id: "CO003", status: "Inactive", action: "Contact" },
        // { id: "CO001", status: "Available", action: "Contact" },
        // { id: "CO002", status: "On-going", action: "Contact" },
        // { id: "CO003", status: "Inactive", action: "Contact" },
        // { id: "CO001", status: "Available", action: "Contact" },
        // { id: "CO002", status: "On-going", action: "Contact" },
        // { id: "CO003", status: "Inactive", action: "Contact" },
    ]
};
const janitor = {
    columns: [
        {
            label: 'ID',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Status',
            field: 'first',
            sort: 'asc'
        },
        {
            label: 'Action',
            field: 'last',
            sort: 'asc'
        },
    ],
    rows: [
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact" },
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact" },
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact" },
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact" },
    ],
};




function Dashboard() {
    /*Map*/
    /*Map*/
    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [106.6856, 10.7633],
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





    const [value, onChange] = useState(new Date());

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
    useEffect(()  => {
        axios.get('http://localhost:8000/api/user/')
        .then(res => setData(() => res.data))
        .catch(err => console.log(err))
    }, [user_json.length])
    
    for (let i = 0; i <= user_json.length-1; i++){
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
    console.log(collector.rows)
    /*Return function*/
    return (
        <div className="db-container">
            <DataFetching />
            <div className="db-sidebar">
                <div className="db-opt">
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5em" }}>
                        <Logo />
                        <div className="db-Logoname">
                            <h4>UWC 2.0</h4>
                            <p>BO interface</p>
                        </div>
                    </div>
                    <SideBarItem
                        Item={MdCalendarToday}
                        page="Calendar"
                        href="/"
                    />
                    <SideBarItem
                        Item={MdOutlineMap}
                        page="Map"
                        href="/"
                    />
                    <SideBarItem
                        Item={MdSource}
                        page="Resources"
                        href="/"
                    />
                    <SideBarItem
                        Item={MdChatBubbleOutline}
                        page="Inbox"
                        href="https://www.messenger.com"
                    />
                </div>
                <div className="db-overview">
                    <div style={{ display: 'flex', margin: '0em 1.5em' }}>
                        <h4 style={{ marginRight: '9em' }}>Overview</h4>
                        <MdAddCircleOutline style={{ marginTop: '.9em', fontSize: '25px', color: '#454545' }} />
                    </div>
                    <div style={{ marginLeft: '1.3em' }}>
                        <div className="db-taskovr">
                            <RiLoader2Fill style={{ margin: '.4em 1em 0em 1em', fontSize: '25px', color: '#454545' }} />
                            <p>Ongoing tasks</p>
                            <h1 style={{ marginLeft: '-3.3em' }}>69</h1>
                        </div>
                        <div className="db-taskovr">
                            <RiTimeLine style={{ margin: '.4em 1em 0em 1em', fontSize: '25px', color: '#454545' }} />
                            <p>Overdued tasks</p>
                            <h1 style={{ marginLeft: '-3.8em' }}>420</h1>
                        </div>
                        <div className="db-taskovr">
                            <RiCheckboxCircleFill style={{ margin: '.4em 1em 0em 1em', fontSize: '25px', color: '#454545' }} />
                            <p>Completed tasks</p>
                            <h1>111</h1>
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
                                    <div className="db-map-container" ref={mapContainerRef} />
                                </div>
                            </div>
                            <div className="db-calendar">
                                <h4>Calendar</h4>
                                <div className="db-calendaring">

                                    <Calendar onChange={onChange} value={value} />

                                </div>
                            </div>
                        </div>
                        <div className="db-lower">
                            <div className="db-collector">
                                <a href="/collector-info"><h4>Collector information</h4></a>
                                <MDBTable scrollY style={{ height: '1000px' }}>
                                    <MDBTableHead columns={collector.columns} />
                                    <MDBTableBody rows={collector.rows} />
                                </MDBTable>
                            </div>
                            <div className="db-janitor">
                                <a href="/janitor-info"><h4>Janitor information</h4></a>
                                <MDBTable scrollY style={{ height: '1000px' }}>
                                    <MDBTableHead columns={janitor.columns} />
                                    <MDBTableBody rows={janitor.rows} />
                                </MDBTable>
                            </div>
                        </div>
                    </div>
                    <div className="db-tasklist">
                        <h2>Task list</h2>
                        <div className="db-checkList">
                            <div className="db-list-container">
                                {checkList.map((item, index) => (
                                    <div key={index}>
                                        <input value={item} type="checkbox" onChange={handleCheck} />
                                        <span className={isChecked(item)}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="db-checkedlist">
                            <p>Items checked are: </p>
                            <p>{`${checkedItems}`}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Dashboard;
