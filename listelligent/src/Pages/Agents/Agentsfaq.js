import React from 'react';
import Agentlayout from '../../components/Agent/Agentlayout';
import '../../Style/Agents/agentfaq.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Agentsfaq = () => {
    return (
        <Agentlayout>

            <div className='faq-header-container'>
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <div className='faq-header'>
                                <h3>Knowledge Base</h3>
                                <Form className='header-search'>
                                    <Form.Control size="lg" type="text" placeholder="Search the Help Center" />
                                    <Link to={"/agentslist"}>Search</Link>
                                </Form>
                            </div>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                </Container>
            </div>

            <div className='bread-crums-container'>
                <Container>
                    <Row>
                        <Col>
                            <div className='bread-crums'>
                                <Link to={"/agentDashboard"}>Home /</Link>
                                <Link to={"/agentsFAQ"}> FAQ for Agents</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className='faq-box'>
                                <div className='box-header'>
                                    <h5>FAQ for Agents</h5>
                                </div>
                                <hr></hr>
                                <div className='box-content'>
                                    <Link>Is UpNest Available Across the U.S.?</Link>
                                    <hr></hr>
                                    <Link>What Does UpNest Expect of a Partner Agent?</Link>
                                    <hr></hr>
                                    <Link>Do Most Agents Discount Their Commission?</Link>
                                    <hr></hr>
                                    <Link>How Many Agents Will I Compete Against?</Link>
                                    <hr></hr>
                                    <Link>How Is UpNest Involved in the Sales Process?</Link>
                                    <hr></hr>
                                    <Link>What’s the Best Way to Contact UpNest?</Link>
                                    <hr></hr>
                                    <Link>How Can I View a Client’s Contact Information?</Link>
                                    <hr></hr>
                                    <Link>Is UpNest a Real Estate Brokerage?</Link>
                                    <hr></hr>
                                    <Link>What Can I Do to Increase the Chances of Winning a Listing?</Link>
                                    <hr></hr>
                                    <Link>How Do I Access My Agent Dashboard?</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='popular-articles-container'>
                <Container>
                    <Row>
                        <Col>
                            <div className='popular-articles'>
                                <h3>Popular Articles</h3>
                                <ul>
                                    <li><Link>How to Add Reviews to Your Agent Profile</Link></li>
                                    <li><Link>How Do Expired Rate and Average Submission Time Affect My Ranking?</Link></li>
                                    <li><Link>How to Pay UpNest When a Referral Closes</Link></li>
                                    <li><Link>Is UpNest Available Across the U.S.?</Link></li>
                                    <li><Link>Do Most Agents Discount Their Commission?</Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='last-section'>
                <Container>
                    <Row>
                        <Col>
                            <h6>Contact Us</h6>
                            <p>Unable to find an answer to a question you have?</p>
                            <p>Contact support@upnest.com for help.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Agentlayout>
    )
}

export default Agentsfaq;