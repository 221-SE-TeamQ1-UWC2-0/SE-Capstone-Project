import "./janitor.css";
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


function Janitor(){
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
                            <h1 style={{marginLeft:'-3.3em'}}>69</h1>
                        </div>
                        <div className="taskovr">
                            <RiTimeLine style={{margin:'.4em 1em 0em 1em', fontSize:'25px', color:'#454545'}}/>
                            <p>Overdued tasks</p>
                            <h1 style={{marginLeft:'-3.8em'}}>420</h1>
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
                        <p>JANITOR INFORMATION</p>
                    </div>
                    <div style={{float:'right'}}>
                        <div className="headerstuff">                         
                            <MdInfo style={{margin:'.25em .25em',fontSize:'25px', color:'#454545'}}/>
                            <MdNotifications style={{margin:'.25em .25em',fontSize:'25px', color:'#454545'}}/>
                            <FaUserCircle style={{margin:'.1em .25em',fontSize:'30px', color:'#acacac'}}/>
                        </div>
                    </div>
                </div>
                <div className="main">
                    
                </div>

            </div>
        </div>
    );
}
export default Janitor;
