import "./Edit.css";
import React, { useState, Component, useEffect } from "react";


import {
    MdCalendarToday,
    MdOutlineMap,
    MdSource,
    MdChatBubbleOutline,
    MdSettings,

  } from "react-icons/md";
  import {
    FaRegImage,
    FaUserCircle,
    FaRegIdCard,

  } from "react-icons/fa";
  /*-----------------------*/

const SideBarItem = ({ Item, page, href }) => {
    return (
      <a className="edit-sidebar_link" href={href}>
        <div className="edit-sidebar_item">
          {<Item className="edit-sidebar_img" />}
          <h3>
            {page}
          </h3>
        </div>
      </a>
    );
  };
const Logo = () => {
    return (
        <div className="edit-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" />
        </div>
    );
};


function Edit(){
    
    /*Return function*/    
    return (
        <div className="edit-container">
            <div className="edit-sidebar">
                <div className="edit-opt">
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5em" }}>
                        <Logo />
                        <div className="edit-Logoname">
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
            </div>
            
            <div className="edit-content">
                <div className="edit-header">
                    <div style={{float:'left'}}>
                        <p>EDIT EMPLOYEE</p>
                    </div>
                    <div style={{float:'right'}}>
                        <div className="edit-headerstuff">
                            <button className="edit-cancel">Cancel</button>
                            <button className="edit-save">SAVE</button>                            
                        </div>
                    </div>
                </div>
                <div className="edit-main">
                    <div className="edit-main-left">
                        <div className="edit-photo">
                            <div className="small-title">
                                <FaRegImage style={{ marginTop:'0.15em', fontSize:'25px', marginRight:'1em' }}/>
                                <p>Photo</p>
                            </div>
                            <h5 style={{margin:'0.6em 1em' }}><b>Avatar</b></h5>
                            <div className="edit-avatar">
                                <div className="avatar-img"></div>
                                <button> Change </button>
                                <button> Remove </button>
                            </div>
                        </div>
                        <div className="edit-account">
                            <div className="small-title">
                                <FaUserCircle style={{ marginTop:'0.15em', fontSize:'25px', marginRight:'1em' }}/>
                                <p>Account</p>
                                <button> Edit </button>
                            </div>
                        </div>
                    </div>
                    <div className="edit-main-right">
                        <div className="general-in4">
                            <div className="small-title">
                                <FaRegIdCard style={{ marginTop:'0.15em', fontSize:'25px', marginRight:'1em' }}/>
                                <p>Account</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Edit;
