import "./Edit.css";
import React, { useState, Component, useEffect } from "react";


import {
    MdOutlineMap,
    MdChatBubbleOutline,
    MdOutlineAddLocation,
} from "react-icons/md";

import {
    RiUserLine,
    RiUserLocationLine,
    RiTruckLine,
} from "react-icons/ri";
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
                        href="/vehicle-info"
                    />
                    <SideBarItem
                        Item={MdOutlineAddLocation}
                        page="MCP"
                        href="/mcp-info"
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
                            <div className="edit-info">
                                <div className="user-box">
                                    <label>Username</label>
                                    <input type="text" name="" required="" placeholder="user name"/>                                    
                                </div>
                                <div className="user-box">
                                    <label>Password</label>
                                    <input type="password" name="" required="" placeholder="user password"/>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit-main-right">
                        <div className="general-in4">
                            <div className="small-title">
                                <FaRegIdCard style={{ marginTop:'0.15em', fontSize:'25px', marginRight:'1em' }}/>
                                <p>Account</p>
                            </div>
                            <div className="cover">
                                <div className="user-box">
                                    <label>Fullname</label>
                                    <input type="text" name="" required="" placeholder="full name"/>                                    
                                </div>
                                <div className="user-box">
                                    <label>Email</label>
                                    <input type="text" name="" required="" placeholder="user email"/>                                    
                                </div>
                            </div>
                            <div className="cover">
                                <div className="user-box">
                                    <label>Phone</label>
                                    <input type="text" name="" required="" placeholder="phone number"/>                                    
                                </div>
                                <div className="user-box">
                                    <label>Role</label>
                                    <select name="languages" id="lang" placeholder="user role" style={{color:"gray"}}>
                                        <option value="javascript">Back officer</option>
                                        <option value="php">Collector</option>
                                        <option value="java">Janitor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="cover">
                                <div className="user-box">
                                    <label>DOB</label>
                                    <input type="date" name="" required="" style={{color:'gray'}}/>
                                </div>
                                <div className="user-box">
                                    <label>Gender</label>
                                    <select name="languages" id="lang" placeholder="user gender" style={{color:"gray"}}>
                                        <option value="javascript">Male</option>
                                        <option value="php">Female</option>
                                        <option value="java">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="cover">
                                <div className="user-box">
                                    <label>Address</label>
                                    <input type="text" name="" required="" placeholder="user address" style={{color:'gray'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Edit;
