import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../Style/Agents/agentheder.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Agentheader = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                if (res.data.Status === "Success") {
                    setName(res.data.name)
                }
            })
            .then(err => console.log(err));
    }, [])

    const handleDelete = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                navigate('/');
            }).catch(err => console.log(err));
    }

    return (
        <>
            {['xl'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/agentDashboard">Listelligent</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Listelligent</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 nav-links">
                                    <Link to={'/agentDashboard'}>Dashboard</Link>
                                    <Link to={'/myProposal'}>My Proposals</Link>
                                    <NavDropdown className='dropdownmenu' title={name} id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                        <Link to={'/agentDashboard'}>Dashboard</Link>
                                        <Link to={'/myProposal'}>My Proposals</Link>
                                        <Link to={'/agentPerformance'}>My Performance</Link>
                                        <Link to={'/myAgentProfile'}>My Profile</Link>
                                        <Link to={'/agentsAccount'}>Account</Link>
                                        <Link to={'/agentsFAQ'}>Agent FAQ</Link>
                                        <Link onClick={handleDelete}>Logout</Link>
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