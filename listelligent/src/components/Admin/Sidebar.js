import React from "react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="sidebar-content">
      <h2 className="p-2 headTitle">
        <Link to={"/"}>Listelligent</Link>
      </h2>
      <hr />
      <ul className="sidebarMenuList">
        <li className={isActive("/admin/dashboard") ? "active" : ""}>
          <AiOutlineDashboard />
          <Link to={"/admin/dashboard"}>DASHBOARD</Link>
        </li>
        <li className={isActive("/admin/orders") ? "active" : ""}>
          <FaShoppingCart />
          <Link to={"/admin/orders"}>Orders</Link>
        </li>
        <li className={isActive("/admin/leads") ? "active" : ""}>
          <FaHandshake />
          <Link to={"/admin/leads"}>Leads</Link>
        </li>
        <li className={isActive("/admin/agentsview") ? "active" : ""}>
          <FaRegUser />
          <Link to={"/admin/agentsview"}>Agents</Link>
        </li>
        <li className={isActive("/admin/zipcode") ? "active" : ""}>
          <FiMapPin />
          <Link to={"/admin/zipcode"}>Zip Code</Link>
        </li>        
      </ul>
    </div>
  );
};

export default Sidebar;
