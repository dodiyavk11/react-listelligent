import React from 'react';
import '../Style/singlepost.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import Image from 'react-bootstrap/Image';
import { HiOfficeBuilding } from "react-icons/hi";
import { MdContactless } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import Layout from '../components/Layouts/Layout';
import { Link } from 'react-router-dom';

const Singlepost = () => {
    return (
        <Layout>
            <div className='singlepost-navbar-Container'>
                <Container>
                    <Row>
                        {/* <Col md={12}>
                            <Navbar expand="md" className='singlepost-navbar'>
                                <Container>
                                    <Navbar.Brand href="/" className='singlepost-nav-logo'>Listelligent</Navbar.Brand>
                                </Container>
                            </Navbar>
                        </Col> */}
                        <Col md={12} className='d-flex justify-content-center breadcrumb'>
                            <ul>
                                <li><a href='/'>Home</a><HiOutlineChevronRight /></li>
                                <li>Rhode Island</li>
                            </ul>
                        </Col>
                        <Col className='header-heading'>
                            <h2>Top Real Estate Agents</h2>
                            <h2>in Rhode Island</h2>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={3}></Col>
                        <Col lg={6}>
                            <Form className='header-search'>
                                <Form.Control size="lg" type="text" placeholder="Search" />
                                <Link to={"/agentslist"}>GET STARTED<HiOutlineArrowSmRight /></Link>
                            </Form>
                        </Col>
                        <Col lg={3}></Col>
                    </Row>
                </Container>
            </div>


            <div className='singlepost-second-section'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>How much can I save by using a Listelligent pro?</h1>
                            <h1 className='mt-4'>Sales Price</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}></Col>
                        <Col md={6} className='rang-label'>
                            <Form.Label>Listing Price</Form.Label>
                            <Form.Range />
                        </Col>
                        <Col md={3}></Col>
                    </Row>

                    <Row className='calculation-colunms'>
                        <Col className='calculator-stat-listelligent'>
                            <p>Agent fees with listelligent</p>
                            <p>1%</p>
                            <h3>$18,200</h3>
                        </Col>
                        <Col className='calculator-stat-others'>
                            <p>Other Agents</p>
                            <p>3%</p>
                            <h3>$21,000</h3>
                        </Col>
                        <Col className='calculator-stat-saving'>
                            <p>Potential Savings:</p>
                            <h3>$2,800</h3>
                        </Col>
                    </Row>

                </Container>
            </div>

            <div className='singlepost-third-section'>
                <Container>
                    <Row>
                        <Col md={12} className='agent-heading'>
                            <h2>Agents to Select</h2>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <div className='agent-table-container'>
                        <Row className='agent-table'>
                            <Col md={4}>
                                <Row>
                                    <Col md={4}>
                                        <Image src="https://storage.googleapis.com/upnest1/upload/realtor/1212867110_260c2e97-5191-4c7c-bc42-67a8a879dc04.jpeg" roundedCircle />
                                    </Col>
                                    <Col md={8} className='agent-table-content'>
                                        <h4>Emilio DiSpirito IV</h4>
                                        <p>Owner, Engel & Völkers</p>
                                        <div className='agent-table-btn'>
                                            <Button variant="outline-primary">Get Introduced</Button>{' '}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} className='agent-second-col'>
                                <h5>11</h5>
                                <p>Years of experience</p>
                            </Col>
                            <Col md={4} className='agent-third-col'>
                                <h5>167</h5>
                                <p>Transactions in the last 12mo.</p>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row className='agent-table'>
                            <Col md={4}>
                                <Row>
                                    <Col md={4}>
                                        <Image src="https://storage.googleapis.com/upnest1/upload/realtor/1009999560_02cf0900-a122-4d6a-ad8c-130768e55307.jpeg" roundedCircle />
                                    </Col>
                                    <Col md={8} className='agent-table-content'>
                                        <h4>Matthew Patty</h4>
                                        <p>Century 21 Shoreline Properties</p>
                                        <div className='agent-table-btn'>
                                            <Button variant="outline-primary">Get Introduced</Button>{' '}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} className='agent-second-col'>
                                <h5>14</h5>
                                <p>Years of experience</p>
                            </Col>
                            <Col md={4} className='agent-third-col'>
                                <h5>101</h5>
                                <p>Transactions in the last 12mo.</p>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row className='agent-table'>
                            <Col md={4}>
                                <Row>
                                    <Col md={4}>
                                        <Image src="https://storage.googleapis.com/upnest1/upload/realtor/2141551725_fa041b3c-decd-48da-bf04-c9811d67fc45.jpeg#a=1" roundedCircle />
                                    </Col>
                                    <Col md={8} className='agent-table-content'>
                                        <h4>Elise Vetri</h4>
                                        <p>Keller Williams Realty</p>
                                        <div className='agent-table-btn'>
                                            <Button variant="outline-primary">Get Introduced</Button>{' '}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} className='agent-second-col'>
                                <h5>19</h5>
                                <p>Years of experience</p>
                            </Col>
                            <Col md={4} className='agent-third-col'>
                                <h5>47</h5>
                                <p>Transactions in the last 12mo.</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            <div className='single-post-fourth-section'>
                <Container>
                    <Row className='align-items-center'>
                        <Col md={6}>
                            <h3 className='m-0'>Find top real estate agents in Rhode Island</h3>
                        </Col>
                        <Col md={6}>
                            <Form.Control size="md" type="text" placeholder="" />
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col md={3} className='state-agents'>
                            <ul>
                                <li>Charlestown</li>
                                <li>Coventry</li>
                                <li>Cranston</li>
                                <li>Cumberland</li>
                                <li>East Greenwich</li>
                                <li>East Providence</li>
                            </ul>
                        </Col>
                        <Col md={3} className='state-agents'>
                            <ul>
                                <li>Charlestown</li>
                                <li>Coventry</li>
                                <li>Cranston</li>
                                <li>Cumberland</li>
                                <li>East Greenwich</li>
                                <li>East Providence</li>
                            </ul>
                        </Col>
                        <Col md={3} className='state-agents'>
                            <ul>
                                <li>Charlestown</li>
                                <li>Coventry</li>
                                <li>Cranston</li>
                                <li>Cumberland</li>
                                <li>East Greenwich</li>
                                <li>East Providence</li>
                            </ul>
                        </Col>
                        <Col md={3} className='state-agents'>
                            <ul>
                                <li>Charlestown</li>
                                <li>Coventry</li>
                                <li>Cranston</li>
                                <li>Cumberland</li>
                                <li>East Greenwich</li>
                                <li>East Providence</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='singlepost-fifth-section'>
                <Container>
                    <Row>
                        <Col md={4} className='agent-col'>
                            <HiOfficeBuilding />
                            <h5>Find Local Agents</h5>
                            <p>Insert your address to connect with top agents that list for 1%</p>
                        </Col>
                        <Col md={4}>
                            <MdContactless />
                            <h5>Connect</h5>
                            <p>Review agent profile and schedule an interview</p>
                        </Col>
                        <Col md={4}>
                            <FaHandHoldingDollar />
                            <h5>Save Thousands of Dollars!</h5>
                            <p>Work with your agent to get your home sold!</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='singlepost-six-section'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h3>Connect with top real estate agents in Rhode Island</h3>
                        </Col>
                        <Col md={12} className='d-flex justify-content-center'>
                            <Form className='singlepost-footer-search'>
                                <Form.Control size="md" type="text" placeholder="Search" />
                                <Link to={"/agentslist"}>GET STARTED<HiOutlineArrowSmRight /></Link>
                            </Form>
                        </Col>
                        <Col md={12}>
                            <h4>No Obligation-No Spam-Fast-Simple</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Singlepost;