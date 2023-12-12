import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Adminheader = () => {

    const handleDelete = () => {
        axios.get('http://localhost:3001/logout').then(res => {}).catch(err => console.log(err));
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary dashboad-navbar">
                <Container fluid>
                    <Navbar.Brand href="/admin/dashboard">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="justify-content-end flex-grow-1 pe-3" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="#">Home</Nav.Link>
                            <Nav.Link href="#">Link</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search..." className="me-2" aria-label="Search" />
                        </Form>
                        <Link to={'/'} variant="outline-light" className='admin-header-logout-btn' onClick={handleDelete}>LOGGED OUT</Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Adminheader;