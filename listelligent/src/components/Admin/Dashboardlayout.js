import React from 'react';
import Sidebar from './Sidebar';
import Adminheader from './Adminheader';
import '../../Style/Admin/dashboardlayout.css';

const Dashboardlayout = ({ children }) => {
    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <Sidebar></Sidebar>
            </div>
            <div className='main-content'>
                <Adminheader></Adminheader>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Dashboardlayout;