import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoDiamondOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar-content">
      <h1 className="p-2">
        <Link to={"/"}>Listelligent</Link>
      </h1>
      <hr />
      <ul className="sidebarMenuList">
        <li>
          <AiOutlineDashboard />
          <Link to={"/admin/dashboard"}>DASHBOARD</Link>
        </li>
        <li>
          <FaShoppingCart />
          <Link to={"/admin/icons"}>Orders</Link>
        </li>
        <li>
          <FaHandshake />
          <Link to={"/admin/icons"}>Leads</Link>
        </li>
        <li>
          <FaRegUser />
          <Link to={"/admin/agentsview"}>Agents</Link>
        </li>
        <li>
          <FiMapPin />
          <Link to={"/admin/zipcode"}>Zip Code</Link>
        </li>        
      </ul>
    </div>
  );
};

export default Sidebar;
