import "./dashboard.css";
import React, { useState, Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


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
const checkList = ["Rooftop t4", "???", "Die", "Draft SE", "Life"];
/*Table*/


const collector = {
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
        { id: "CO001", status: "Available", action: "Contact" },
        { id: "CO002", status: "On-going", action: "Contact" },
        { id: "CO003", status: "Inactive", action: "Contact"},
        { id: "CO001", status: "Available", action: "Contact" },
        { id: "CO002", status: "On-going", action: "Contact" },
        { id: "CO003", status: "Inactive", action: "Contact"},
        { id: "CO001", status: "Available", action: "Contact" },
        { id: "CO002", status: "On-going", action: "Contact" },
        { id: "CO003", status: "Inactive", action: "Contact"},
        { id: "CO001", status: "Available", action: "Contact" },
        { id: "CO002", status: "On-going", action: "Contact" },
        { id: "CO003", status: "Inactive", action: "Contact"},
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
        { id: "Ja003", status: "Inactive", action: "Contact"},
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact"},
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact"},
        { id: "JA001", status: "Available", action: "Contact" },
        { id: "JA002", status: "On-going", action: "Contact" },
        { id: "Ja003", status: "Inactive", action: "Contact"},
    ],
  };



function Dashboard(){
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




    /*Return function*/    
    return (
        <div className="db-container">
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
                        href="/"
                    />
                    <SideBarItem
                        Item={MdSettings}
                        page="Settings"
                        href="/"
                    />
                </div>
                <div className="db-overview">
                    <div style={{ display:'flex', margin:'0em 1.5em'}}>
                        <h4 style={{ marginRight:'9em'}}>Overview</h4>
                        <MdAddCircleOutline style={{ marginTop:'.9em', fontSize:'25px', color:'#454545'}}/>
                    </div>
                    <div style={{ marginLeft:'1.3em'}}>
                        <div className="db-taskovr">
                            <RiLoader2Fill style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Ongoing tasks</p>
                            <h1 style={{marginLeft:'-3.3em'}}>69</h1>
                        </div>
                        <div className="db-taskovr">
                            <RiTimeLine style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Overdued tasks</p>
                            <h1 style={{marginLeft:'-3.8em'}}>420</h1>
                        </div>
                        <div className="db-taskovr">
                            <RiCheckboxCircleFill style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Completed tasks</p>
                            <h1>111</h1>
                        </div>
                    </div>  
                </div>
            </div>
            
            <div className="db-content">
                <div className="db-header">
                    <div style={{float:'left'}}>
                        <p>DASHBOARD</p>
                    </div>
                    <div style={{float:'right'}}>
                        <div className="db-headerstuff">
                            <button className="db-addtaskbtn">
                                <FaPlus style={{fontSize:'15px', color:'white', float:'left'}}/>
                                <p style={{fontSize:'15px', color:'white', float:'left', marginTop:'0em'}}>Add task</p>
                            </button>                            
                            <MdInfo style={{margin:'.25em .25em',fontSize:'25px', color:'#454545'}}/>
                            <MdNotifications style={{margin:'.25em .25em',fontSize:'25px', color:'#454545'}}/>
                            <FaUserCircle style={{margin:'.1em .25em',fontSize:'30px', color:'#acacac'}}/>
                        </div>
                    </div>
                </div>
                <div className="db-main">
                    <div className="db-board">
                        <div className="db-upper">
                            <div className="db-map">
                                <h2>Map</h2>
                                <div className="db-mapping"></div>
                            </div>
                            <div className="db-calendar">
                                <h2>Calendar</h2>
                                <div className="db-calendaring"></div>
                            </div>
                        </div>
                        <div className="db-lower">                            
                            <div className="db-collector">
                            <MDBTable scrollY style={{height:'1000px'}}>
                            <MDBTableHead columns={collector.columns} />
                            <MDBTableBody rows={collector.rows} />
                            </MDBTable>
                            </div>
                            <div className="db-janitor">
                            <MDBTable scrollY style={{height:'1000px'}}>
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
