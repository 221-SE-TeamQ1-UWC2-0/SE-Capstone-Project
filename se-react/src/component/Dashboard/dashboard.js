import "./dashboard.css";
import React, { useState, Component } from "react";

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
      <a className="sidebar_link" href={href}>
        <div className="sidebar_item">
          {<Item className="sidebar_img" />}
          <h3>
            {page}
          </h3>
        </div>
      </a>
    );
  };
const Logo = () => {
    return (
        <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" />
        </div>
    );
};
/*Check list*/
const checkList = ["Rooftop t4", "???", "Die", "Draft SE", "Life"];
/*Table*/
const collector = [
    { id: "CO001", status: "Available", action: "Contact" },
    { id: "CO002", status: "On-going task", action: "Contact" },
    { id: "CO003", status: "Inactive", action: "Contact"},
]
const janitor = [
    { id: "JA001", status: "Available", action: "Contact" },
    { id: "JA002", status: "On-going task", action: "Contact" },
    { id: "Ja003", status: "Inactive", action: "Contact"},
]




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
        <div className="container">
            <div className="sidebar">
                <div className="opt">
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5em" }}>
                        <Logo />
                        <div className="Logoname">
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
                <div className="overview">
                    <div style={{ display:'flex', margin:'0em 1.5em'}}>
                        <h4 style={{ marginRight:'9em'}}>Overview</h4>
                        <MdAddCircleOutline style={{ marginTop:'.9em', fontSize:'25px', color:'#454545'}}/>
                    </div>
                    <div style={{ marginLeft:'1.3em'}}>
                        <div className="taskovr">
                            <RiLoader2Fill style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Ongoing tasks</p>
                            <h1>69</h1>
                        </div>
                        <div className="taskovr">
                            <RiTimeLine style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Overdued tasks</p>
                            <h1>420</h1>
                        </div>
                        <div className="taskovr">
                            <RiCheckboxCircleFill style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Completed tasks</p>
                            <h1>111</h1>
                        </div>
                    </div>  
                </div>
            </div>
            
            <div className="content">
                <div className="header">
                    <div style={{float:'left'}}>
                        <p>DASHBOARD</p>
                    </div>
                    <div style={{float:'right'}}>
                        <div className="headerstuff">
                            <button className="addtaskbtn">
                                <FaPlus style={{fontSize:'15px', color:'white', float:'left'}}/>
                                <p style={{fontSize:'15px', color:'white', float:'left', marginTop:'0em'}}>Add task</p>
                            </button>                            
                            <MdInfo style={{margin:'.25em .25em',fontSize:'25px', color:'#454545'}}/>
                            <MdNotifications style={{margin:'.25em .25em',fontSize:'25px', color:'#454545'}}/>
                            <FaUserCircle style={{margin:'.1em .25em',fontSize:'30px', color:'#acacac'}}/>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="board">
                        <div className="upper">
                            <div className="map">
                                <h2>Map</h2>
                                <div className="mapping"></div>
                            </div>
                            <div className="calendar">
                                <h2>Calendar</h2>
                                <div className="calendaring"></div>
                            </div>
                        </div>
                        <div className="lower">
                            <div className="collector">
                            <table>
                                <tr>
                                    <th style={{borderBottom:'solid 1px black'}}>Collector ID</th>
                                    <th style={{borderBottom:'solid 1px black'}}>Status</th>
                                    <th style={{borderBottom:'solid 1px black'}}>Action</th>
                                </tr>
                                {collector.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.id}</td>
                                        <td>{val.status}</td>
                                        <td>{val.action}</td>
                                    </tr>
                                )
                                })}
                            </table>
                            </div>
                            <div className="janitor">
                            <table>
                                <tr>
                                    <th style={{borderBottom:'solid 1px black'}}>Janitor ID</th>
                                    <th style={{borderBottom:'solid 1px black'}}>Status</th>
                                    <th style={{borderBottom:'solid 1px black'}}>Action</th>
                                </tr>
                                {janitor.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.id}</td>
                                        <td>{val.status}</td>
                                        <td>{val.action}</td>
                                    </tr>
                                )
                                })}
                            </table>
                            </div>
                        </div>
                    </div>
                    <div className="tasklist">
                        <h2>Task list</h2>
                        <div className="checkList">
                            <div className="list-container">
                                {checkList.map((item, index) => (
                                    <div key={index}>
                                    <input value={item} type="checkbox" onChange={handleCheck} />
                                    <span className={isChecked(item)}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="checkedlist">
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
