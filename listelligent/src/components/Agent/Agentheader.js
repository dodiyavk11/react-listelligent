import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../Style/Agents/agentheder.css';
import { Link } from 'react-router-dom';

const Agentheader = () => {
    return (
        <>
            {['xl'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container>
                        <Navbar.Brand href="/agentDashboard">Listelligent</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 nav-links">
                                    <Link to={'/agentDashboard'}>Dashboard</Link>
                                    <Link to={'#'}>My Proposals</Link>
                                    <NavDropdown className='dropdownmenu' title="User Name" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                        <NavDropdown.Item href="/agentDashboard">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item href="#">My Proposals</NavDropdown.Item>
                                        <NavDropdown.Item href="#">My Performance</NavDropdown.Item>
                                        <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Account</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Agent FAQ</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Agentheader;