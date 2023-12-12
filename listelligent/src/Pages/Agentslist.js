import React from 'react';
import Layout from '../components/Layouts/Layout';
import '../Style/agentlist.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const steps = [
    {
        label: 'Local Professionals',
        description: `Work with top agents in the area`,
    },
    {
        label: 'Review Profile',
        description:
            'Request more information by setting up an interview',
    },
    {
        label: 'No Hidden Fees',
        description: `Listelligent is completely free to use.`,
    },
];


const Agentslist = () => {

    const [isOpen, setIsOpen] = useState(false);
    function toggle() {
        setIsOpen((isOpen) => !isOpen);
    }

    const [AgentsisOpen, agentOpen] = useState(false);
    function agenttoggle() {
        agentOpen((AgentsisOpen) => !AgentsisOpen);
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Layout>
            <div className='form-container' style={{ display: isOpen ? 'none' : 'block' }}>
                <Container>
                    <Row>
                        <Col lg={3}></Col>
                        <Col lg={6}>
                            <div className='form'>
                                <h3>One Step Away From Huge Savings!</h3>
                                <Form>
                                    <Form.Control className='mt-5 mb-4' size="lg" type="text" placeholder="First and last name" />
                                    <Form.Control className='mt-4 mb-1' size="lg" type="text" placeholder="Phone Number" />
                                    <div className='or'><span>OR</span></div>
                                    <Form.Control className='mt-1 mb-5' size="lg" type="text" placeholder="Email" />
                                    <Button onClick={toggle} variant="warning">Continue</Button>{' '}
                                </Form>
                            </div>
                        </Col>
                        <Col lg={3}></Col>
                    </Row>
                </Container>
            </div>

            {isOpen &&
                <div className='steper-container' style={{ display: AgentsisOpen ? 'none' : 'block' }}>
                    <Container>
                        <Row>
                            <Col lg={3}></Col>
                            <Col lg={6} className='steper-content'>
                                <h3>Locating agents based on your zip code</h3>
                                <Box sx={{ maxWidth: 600 }} className='sterper'>
                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        {steps.map((step, index) => (
                                            <Step key={step.label} className='agentlist-step-label'>
                                                <StepLabel
                                                    optional={
                                                        index === 2 ? (
                                                            <Typography variant="caption">Last step</Typography>
                                                        ) : null
                                                    }
                                                >
                                                    {step.label}
                                                </StepLabel>
                                                <StepContent>
                                                    <Typography>{step.description}</Typography>
                                                    <Box sx={{ mb: 2 }}>
                                                        <div>
                                                            <Button
                                                                className='agentlist-steper-btn'
                                                                variant="contained"
                                                                onClick={() => {
                                                                    handleNext();
                                                                    if (index === steps.length - 1) {
                                                                        agenttoggle();
                                                                    }
                                                                }}
                                                                sx={{ mt: 1, mr: 1 }}
                                                            >
                                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                                <ProgressBar now={60} />
                            </Col>
                            <Col lg={3}></Col>
                        </Row>
                    </Container>
                </div>
            }

            {AgentsisOpen &&
                <div className='agents-container'>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <h3>1,683 Real Estate Agents Serving 92119</h3>
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <Row>
                            <Col lg={9}>
                                <div className='agent-profile'>
                                    <Row className='d-flex align-items-center'>
                                        <Col md={3} className='agent-img'>
                                            <img src='https://storage.googleapis.com/upnest1/upload/realtor/1505730803_2621ec1e-d519-49f6-84bc-7197ada234d7.jpeg'></img>
                                        </Col>
                                        <Col md={9}>
                                            <h4>Jeff Rossa</h4>
                                            <p>Market Real Estate</p>
                                            <p>(619) 889-8790</p>
                                            <p><span>278</span>Total Sales</p>
                                            <div className='agentlist-btn'>
                                                <Link to={"/agentprofile"}>View Profile</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='agent-profile'>
                                    <Row className='d-flex align-items-center'>
                                        <Col md={3} className='agent-img'>
                                            <img src='https://storage.googleapis.com/upnest1/upload/realtor/1469387760_4e54bb70-f2eb-426e-b6d2-e9a0a7b47ce2.jpeg'></img>
                                        </Col>
                                        <Col md={9}>
                                            <h4>Robin Barron</h4>
                                            <p>Big Block Realty, Inc.</p>
                                            <p>(619) 871-7219</p>
                                            <p><span>43</span>Total Sales</p>
                                            <div className='agentlist-btn'>
                                                <Link to={"/agentprofile"}>View Profile</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div><div className='agent-profile'>
                                    <Row className='d-flex align-items-center'>
                                        <Col md={3} className='agent-img'>
                                            <img src='https://storage.googleapis.com/upnest1/upload/realtor/672158992_abd6408e-e3d6-4ce7-a7c4-4cf1df8b0497.jpeg'></img>
                                        </Col>
                                        <Col md={9}>
                                            <h4>Melissa Goldstein Tucci</h4>
                                            <p>Melissa Goldstein Tucci</p>
                                            <p>(619) 787-6852</p>
                                            <p><span>75</span>Total Sales</p>
                                            <div className='agentlist-btn'>
                                                <Link to={"/agentprofile"}>View Profile</Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={3}></Col>
                        </Row>
                    </Container>
                </div>
            }
        </Layout>
    )
}

export default Agentslist;