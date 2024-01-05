import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaRegBell, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import adminImg from "../../assets/admin.png";
const Adminheader = () => {
  const navigate = useNavigate();
  const handleDelete = () => {
    localStorage.clear();
    navigate("/login");
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="justify-content-end headerBar">
      <Navbar expand="lg" className="bg-body-tertiary dashboad-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end"> 
          <Nav className="ml-auto">
            <NavDropdown
              title={
                <img
                  src={adminImg}
                  width={30}
                  alt="Admin"
                  className="rounded-circle"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item disabled>{userData.name.toUpperCase()}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><FaRegBell/> Notification</NavDropdown.Item>
              <NavDropdown.Item><FaRegUser/> Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleDelete}> <FaSignOutAlt /> Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    </div>
  );
};

export default Adminheader;
