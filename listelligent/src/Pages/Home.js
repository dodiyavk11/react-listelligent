import React from 'react';
import '../Style/home.css';
import Layout from '../components/Layouts/Layout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsGeoAltFill } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdContactless } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";

const Home = () => {
    return (
        <Layout>
            <div className='first-section'>
                <Container>
                    <Row className='mt-3 first-inner-section'>
                        <Col md={6} className='first-left-col'>
                            <h4>Sell Your Home for 1% <br/> Connect With Agents in Your Zip Code</h4>
                            <h5>Enter your address to match with a local professional</h5>
                            <div className='zip-search-input'>
                                <InputGroup className="mt-3 zip-search-input-content">
                                    <Form.Control
                                        placeholder="Enter Address"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    {/* <Button className='zip-code-btn'><BsGeoAltFill />Zip Code</Button> */}
                                    <BsGeoAltFill /><Form.Control type="text" placeholder="Zip Code" />
                                    <Button className='find-btn'>Find A Pro</Button>
                                </InputGroup>
                            </div>
                            <p>No Obligation-No Spam-Fast-Simple</p>
                        </Col>
                        <Col md={6} className='home-img'><img className='rounded' src='https://www.lt6p.com/re/img/buysell/buyers_moving_family_new.jpg' alt='Image'></img></Col>
                    </Row>

                    <Row className='second-inner-section'>
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

            <div className='second-section'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>How much can I save by using a Listelligent pro?</h1>
                            <h1 className='mt-4'>Sales Price</h1>

                        </Col>
                    </Row>

                    <Row>
                        <Col  md={3}></Col>
                        <Col md={6} className='rang-label'>
                            <Form.Label>Listing Price</Form.Label>
                            <Form.Range />
                        </Col>
                        <Col  md={3}></Col>
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

            <div className='third-section'>
                <Container>
                    <Row>
                        <Col md={12} className='third-sec-heading'>
                            <h1>Why work with Listelligent?</h1>
                        </Col>
                    </Row>
                    <Row className='third-sec-content'>
                        <Col md={6}>
                            <h3>Hassle Free Search</h3>
                            <p>Insert your address and connect with a pro right away! No long questionnaires, spam calls, junk emails or any other nonsense.</p>
                            <h3>Easy Interviews</h3>
                            <p>Chat with your local pro to see if they are a good fit for your Real Estate needs.</p>
                            <h3>Save Thousands of Dollars</h3>
                            <p>Listelligent connects you with top agents that will list your home for 1% netting you more money.</p>
                        </Col>
                        <Col md={6}>
                            <img className='rounded' src='https://www.lt6p.com/re/img/buysell/sellers_smiling_couple_new.jpg'></img>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='fourth-section'>
                <Container>
                    <Row className='align-items-center'>
                        <Col md={5} className='fourth-sec-heading'>
                            <h2>Connect With Local Agents</h2>
                        </Col>
                        <Col xs={2}></Col>
                        <Col md={5}>
                            <Form className='search-form'>
                                <Form.Control size="lg" type="text" placeholder="Search" />
                                <Link to={"/agentslist"}>Search</Link>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <div className='search-result'>
                            <h1>Agent Search</h1>
                        </div>
                        <Col md={3} className='agents-list'>
                            <ul>
                                <li>Alabama</li>
                                <li>Alaska</li>
                                <li>Arizona</li>
                                <li>Arkansas</li>
                                <li>California</li>
                                <li>Colorado</li>
                                <li>Connecticut</li>
                                <li>Delaware</li>
                                <li>District Of Columbia</li>
                                <li>Florida</li>
                                <li>Georgia</li>
                                <li>Hawaii</li>
                                <li>Idaho</li>
                            </ul>
                        </Col>
                        <Col md={3} className='agents-list'>
                            <ul>
                                <li>Alabama</li>
                                <li>Alaska</li>
                                <li>Arizona</li>
                                <li>Arkansas</li>
                                <li>California</li>
                                <li>Colorado</li>
                                <li>Connecticut</li>
                                <li>Delaware</li>
                                <li>District Of Columbia</li>
                                <li>Florida</li>
                                <li>Georgia</li>
                                <li>Hawaii</li>
                                <li>Idaho</li>
                            </ul>
                        </Col>
                        <Col md={3} className='agents-list'>
                            <ul>
                                <li>Alabama</li>
                                <li>Alaska</li>
                                <li>Arizona</li>
                                <li>Arkansas</li>
                                <li>California</li>
                                <li>Colorado</li>
                                <li>Connecticut</li>
                                <li>Delaware</li>
                                <li>District Of Columbia</li>
                                <li>Florida</li>
                                <li>Georgia</li>
                                <li>Hawaii</li>
                                <li>Idaho</li>
                            </ul>
                        </Col>
                        <Col md={3} className='agents-list'>
                            <ul>
                                <li>
                                    <Link to={"/singlepost"}>Rhode Island</Link>
                                </li>
                                <li>Alaska</li>
                                <li>Arizona</li>
                                <li>Arkansas</li>
                                <li>California</li>
                                <li>Colorado</li>
                                <li>Connecticut</li>
                                <li>Delaware</li>
                                <li>District Of Columbia</li>
                                <li>Florida</li>
                                <li>Georgia</li>
                                <li>Hawaii</li>
                                <li>Idaho</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default Home;