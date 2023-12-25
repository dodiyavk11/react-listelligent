import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoDiamondOutline } from "react-icons/io5";
import { FiMapPin } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className='sidebar-content'>
            <h1><Link to={'/'}>Listelligent</Link></h1>
            <ul>
                <li><AiOutlineDashboard /><Link to={'/admin/dashboard'}>DASHBOARD</Link></li>
                <li><IoDiamondOutline /><Link to={'/admin/icons'}>ICONS</Link></li>
                <li><FaRegUser /><Link to={'/admin/agentsview'}>Agents</Link></li>
                <li><FiMapPin /><Link to={'/admin/zipcode'}>Zip Code</Link></li>
                <li><FaRegBell /><Link to={''}>NOTIFICATIONS</Link></li>
                <li><FaRegUser /><Link to={''}>USER PROFILE</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;