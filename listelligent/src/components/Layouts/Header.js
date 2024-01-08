import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import "../../Style/headerstyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  // const [message, setMessage] = useState('');
//   const [name, setName] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.name && token) {
      setAuth(true);
    }
    // axios.get('http://localhost:3001')
    //     .then(res => {
    //         if (res.data.Status === "Success") {
    //             setAuth(true)
    //             setName(res.data.name)
    //         }
    //         else {
    //             setAuth(false)
    //             // setMessage(res.data.Error)
    //         }
    //     })
    //     .then(err => console.log(err));
  }, []);

  const handleDelete = () => {
    // axios.get('http://localhost:3001/logout')
    //     .then(res => {
    //         window.location.reload(true);
    //     }).catch(err => console.log(err));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {["xl"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Listelligent</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Listelligent
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 nav-links">
                  {/* <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/agentsignup">Agents SignUp</Nav.Link>
                                    <Nav.Link href="/howitwork">How Its Work</Nav.Link> */}
                  <Link to={"/"}>Home</Link>
                  <Link to={"/howitwork"}>How It Works</Link>
                  <Link to={"/agentsignup"}>Agent Signup/Login</Link>
                </Nav>
                {/* {auth ? (
                  <>
                    <Link
                      to={"/"}
                      variant="outline-light"
                      className="header-logout-btn"
                      onClick={handleDelete}
                    >
                      Log out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      variant="outline-light"
                      className="header-login-btn"
                    >
                      Login
                    </Link>
                  </>
                )} */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
