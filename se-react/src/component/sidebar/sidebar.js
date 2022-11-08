import "./sidebar.css";
import {
  FaHome,
  FaUserAlt,
  FaTasks,
  FaRoute,
} from "react-icons/fa";
import {
  MdSettings,
  MdOutlineHelp,
} from "react-icons/md";
import { useState } from "react";

const SideBarItem = ({ Item, page, onHover, href }) => {
  return (
    <a className="sidebar_link" href={href}>
      <div className="sidebar_item">
        {<Item className="sidebar_img" />}
        <h3 style={onHover ? { display: "block" } : { display: "none" }}>
          {page}
        </h3>
      </div>
    </a>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <img src="https://t4.ftcdn.net/jpg/01/68/83/57/360_F_168835764_yJcD5kgoHcF7KJSKGW0u1LEUm1iIocWc.jpg" />
    </div>
  );
};

const SideBar = () => {
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      className="sidebar"
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
      </div>
      <SideBarItem 
        Item={FaHome} 
        page="Home" 
        onHover={onHover} 
        href="/" />
      <SideBarItem
        Item={FaUserAlt}
        page="Profile"
        onHover={onHover}
        href="/profile"
      />
      <SideBarItem
        Item={FaTasks}
        page="Task"
        onHover={onHover}
        href="Task"
      />
      <SideBarItem
        Item={FaRoute}
        page="Route"
        onHover={onHover}
        href="Route"
      />
      <SideBarItem
        Item={MdSettings}
        page="Settings"
        onHover={onHover}
        href="Settings"
      />
      <SideBarItem
        Item={MdOutlineHelp}
        page="Help"
        onHover={onHover}
        href="Help"
      />
    </div>
  );
};

export default SideBar;
