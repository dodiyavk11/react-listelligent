import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import "../Style/agentlist.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import dummyAgent from "../assets/agreement.png";
const steps = [
  {
    label: "Local Professionals",
    description: `Work with top agents in the area`,
  },
  {
    label: "Review Profile",
    description: "Request more information by setting up an interview",
  },
  {
    label: "No Hidden Fees",
    description: `Listelligent is completely free to use.`,
  },
];

const Agentslist = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const storedFormDataString = localStorage.getItem("formData");
  const storedFormData = storedFormDataString
    ? JSON.parse(storedFormDataString)
    : null;
  const [cookies, setCookie] = useState(storedFormData);
  const [agentList, setAgentList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    zip_code: "",
    agent_zip_code: "",
  });

  useEffect(() => {
    if (cookies) {
      setIsOpen(true);
      agentOpen(true);
      setFormData(storedFormDataString);
      getAgentList();
    }
  }, [cookies, storedFormDataString]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserLead();
  };

  const addUserLead = async () => {
    try {
      const zipvalue = formData.zip_code;
      formData.agent_zip_code = zipvalue;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/addLead`,
        formData,
        {
          headers: {
            Authorization: `Bearer 455454545ddsdksdjksdjksdsjdksjdksj`,
          },
          withCredentials: true,
        }
      );
      if (response.status) {
        localStorage.setItem("formData", JSON.stringify(formData));
        // setIsOpen(true)
        setIsOpen((isOpen) => !isOpen);
        agenttoggle()
        getAgentList();
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };

  const getAgentList = async () => {
    try {
      const zipCodes = cookies ? cookies["agent_zip_code"] : formData.agent_zip_code;
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/list/${zipCodes}`,
        {
          withCredentials: true,
        }
      );
      if (response.status) {
        setAgentList(response.data.data);
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", "Something went to wrong", 3000);
    }
  };

  const resetSearch = () => {
    localStorage.removeItem('formData');
    navigate("/");
  };
  return (
    <Layout>
      <div
        className="form-container"
        style={{ display: isOpen ? "none" : "block" }}
      >
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <div className="form">
                <h3>One Step Away From Huge Savings!</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    className="mt-5 mb-4"
                    name="name"
                    size="lg"
                    type="text"
                    placeholder="First and last name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control
                    className="mt-4 mb-4"
                    name="phone"
                    size="lg"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {/* <div className='or'><span>OR</span></div> */}
                  <Form.Control
                    className="mt-1 mb-4"
                    name="email"
                    size="lg"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control
                    className="mt-1 mb-4"
                    name="address"
                    size="lg"
                    type="text"
                    required
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <Form.Control
                    className="mt-1 mb-4"
                    name="zip_code"
                    size="lg"
                    type="number"
                    placeholder="Zip code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                  />
                  {/* <Button type="submit" onClick={toggle} variant="warning">
                    Continue
                  </Button>{" "} */}
                  <Button type="submit" variant="warning">
                    Continue
                  </Button>{" "}
                </Form>
              </div>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Container>
      </div>

      {isOpen && (
        <div
          className="steper-container"
          style={{ display: AgentsisOpen ? "none" : "block" }}
        >
          <Container>
            <Row>
              <Col lg={3}></Col>
              <Col lg={6} className="steper-content">
                <h3>Locating agents based on your zip code</h3>
                <Box sx={{ maxWidth: 600 }} className="sterper">
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label} className="agentlist-step-label">
                        <StepLabel
                          optional={
                            index === 2 ? (
                              <Typography variant="caption">
                                Last step
                              </Typography>
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
                                className="agentlist-steper-btn"
                                variant="contained"
                                onClick={() => {
                                  handleNext();
                                  if (index === steps.length - 1) {
                                    agenttoggle();
                                  }
                                }}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                {index === steps.length - 1
                                  ? "Finish"
                                  : "Continue"}
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
      )}

      {AgentsisOpen && (
        <div className="agents-container">
          <Container>
            <Row>
              <Col md={9}>
                <h3>
                  {agentList.length} Real Estate Agents Serving{" "}
                  {cookies ? cookies["agent_zip_code"] : formData.agent_zip_code}
                </h3>
              </Col>
              <Col md={3} className="text-end">                
                <button className="btn btn-danger" onClick={resetSearch}>
                  Reset
                </button>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              {agentList.map((result, index) => (
                <Col key={index} md={6}>
                  <div className="agent-profile">
                    <Row className="d-flex align-items-center">
                      <Col md={3} className="agent-img">
                        <img alt="agent" src={dummyAgent}></img>
                      </Col>
                      <Col md={9}>
                        <h4>{result.name}</h4>
                        <p>Market Real Estate</p>
                        <p className="mb-3">
                          <span>278</span>Total Sales
                        </p>
                        <div className="agentlist-btn mb-3">
                          <Link to={`/agentprofile/${result.id}`}>
                            View Profile
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
            <NotificationContainer />
          </Container>
        </div>
      )}
    </Layout>
  );
};

export default Agentslist;
