import React, { useState, useEffect } from "react";
import "../Style/home.css";
import "../Style/agentlist.css";
import Layout from "../components/Layouts/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsGeoAltFill } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdContactless } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { CloseButton } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import ProgressBar from "react-bootstrap/ProgressBar";
import Box from "@mui/material/Box";
import StepContent from "@mui/material/StepContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import homeImage from "../../src/assets/home_img.jpg";

const Home = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const storedFormDataString = localStorage.getItem("formData");
  const storedFormData = storedFormDataString
    ? JSON.parse(storedFormDataString)
    : null;
  const [cookies, setCookie] = useState(storedFormData);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmit, setisSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: cookies ? cookies["name"] : "",
    phone: cookies ? cookies["phone"] : "",
    email: cookies ? cookies["email"] : "",
    address: cookies ? cookies["address"] : "",
    zip_code: cookies ? cookies["zip_code"] : "",
    agent_zip_code: cookies ? cookies["agent_zip_code"] : "",
  });

  const [defaultRange, setRange] = useState(1650000);
  const [onePer, setOnePer] = useState(0);
  const [twoPer, setTwoPer] = useState(0);
  const [threePer, setThreePer] = useState(0);
  useEffect(() => {
    setOnePer((defaultRange * 1) / 100);
    setTwoPer((defaultRange * 2) / 100);
    setThreePer((defaultRange * 3) / 100);
  }, [defaultRange]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handlePriceChange = (event) => {
    setRange(event.target.value);
    setOnePer((event.target.value * 1) / 100);
    setTwoPer((event.target.value * 2) / 100);
    setThreePer((event.target.value * 3) / 100);
  };

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
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (cookies) {
      setIsOpen(false);
    }
  }, []);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

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

  const handleSubmitzPro = (e) => {
    e.preventDefault();
    if (formData.address === "" || formData.agent_zip_code === "") {
      NotificationManager.error("Error", "Please fill all field", 3000);
      return false;
    }
    updateField("address", formData.address);
    updateField("agent_zip_code", formData.agent_zip_code);
    setIsOpen((isOpen) => !isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
    setisSubmit(true);
    // addUserLead();
  };

  const updateField = (fieldName, newValue) => {
    setCookie((prevState) => {
      const newState = { ...prevState };
      newState[fieldName] = newValue;
      localStorage.setItem("formData", JSON.stringify(newState));
      return newState;
    });
  };

  const redirectAgentList = () => {
    addUserLead();
  };

  const addUserLead = async () => {
    try {
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
        // setIsOpen((isOpen) => !isOpen);
        navigate("/agentslist");
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };
  return (
    <Layout>
      <div
        className="form-container"
        style={{ display: isOpen ? "block" : "none" }}
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
                  <Button type="submit" variant="warning">
                    Continue
                  </Button>{" "}
                </Form>
              </div>
            </Col>
            <Col lg={3}>
              {" "}
              <CloseButton onClick={toggle} aria-label="Close" />
            </Col>
          </Row>
        </Container>
      </div>
      {isSubmit && (
        <div
          className="steper-container"
          style={{ display: isSubmit ? "block" : "none" }}
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
                                    redirectAgentList();
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
      <div
        className="first-section"
        style={{ display: isOpen || isSubmit ? "none" : "block" }}
      >
        <Container>
          <NotificationContainer />
          <Row className="mt-3 first-inner-section">
            <Col md={6} className="first-left-col">
              <h4>
                Sell Your Home for <span className="highLightText">1%</span>{" "}
                <br /> Connect With Agents in Your Zip Code
              </h4>
              <h5>Enter your address to match with a local professional</h5>
              <p>
                Buyer’s agent fee not included. Consult with your agent on local
                broker co-op commissions.
              </p>
              <div className="zip-search-input">
                <Form onSubmit={handleSubmitzPro}>
                  <InputGroup
                    className="mt-3 zip-search-input-content"
                    style={{ width: "100%" }}
                  >
                    <Form.Control
                      placeholder="Enter Address"
                      className="shadow-none"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    {/* <Button className='zip-code-btn'><BsGeoAltFill />Zip Code</Button> */}
                    <BsGeoAltFill />
                    <Form.Control
                      type="text"
                      name="agent_zip_code"
                      placeholder="Zip Code"
                      className="shadow-none"
                      value={formData.agent_zip_code}
                      onChange={handleChange}
                      required
                    />
                    <Button type="submit" className="find-btn">
                      Find A Pro
                    </Button>
                  </InputGroup>
                </Form>
              </div>
              <p>No Obligation-No Spam-Fast-Simple</p>
            </Col>
            <Col md={6} className="home-img">
              <img className="rounded" src={homeImage} alt="Image"></img>
            </Col>
          </Row>
          <Row className="second-inner-section">
            <Col md={4} className="agent-col">
              <HiOfficeBuilding />
              <h5>Find Local Agents</h5>
              <p>
                Insert your address to connect with top agents that list for 1%
              </p>
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

      <div
        className="second-section"
        style={{ display: isOpen || isSubmit ? "none" : "block" }}
      >
        <Container>
          <Row>
            <Col md={12}>
              <h1>How much can I save by using a Listelligent pro?</h1>
              <h1 className="mt-4">Sales Price</h1>
            </Col>
          </Row>

          <Row>
            <Col md={3}></Col>
            <Col md={6} className="rang-label">
              <Form.Label>Listing Price</Form.Label>
              <center>
                <h4>{formatCurrency(defaultRange)}</h4>
              </center>
              <Form.Range
                min={300000}
                max={3000000}
                step={10}
                value={defaultRange}
                onChange={handlePriceChange}
              />
              <div className="d-flex justify-content-between">
                <h5>300000</h5>
                <h5>3000000</h5>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>

          <Row className="calculation-colunms">
            <Col className="calculator-stat-listelligent">
              <p>Agent fees with listelligent</p>
              <p>1%</p>
              <h3>{formatCurrency(onePer)}</h3>
            </Col>
            <Col className="calculator-stat-others">
              <p>Other Agents</p>
              <p>3%</p>
              <h3>{formatCurrency(threePer)}</h3>
            </Col>
            <Col className="calculator-stat-saving">
              <p>Potential Savings:</p>
              <h3>{formatCurrency(twoPer)}</h3>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        className="third-section"
        style={{ display: isOpen || isSubmit ? "none" : "block" }}
      >
        <Container>
          <Row>
            <Col md={12} className="third-sec-heading">
              <h1>Why work with Listelligent?</h1>
            </Col>
          </Row>
          <Row className="third-sec-content">
            <Col md={6}>
              <h3>Hassle Free Search</h3>
              <p>
                Insert your address and connect with a pro right away! No long
                questionnaires, spam calls, junk emails or any other nonsense.
              </p>
              <h3>Easy Interviews</h3>
              <p>
                Chat with your local pro to see if they are a good fit for your
                Real Estate needs.
              </p>
              <h3>Save Thousands of Dollars</h3>
              <p>
                Listelligent connects you with top agents that will list your
                home for 1% netting you more money.
              </p>
              <p>
                *Buyer’s agent fee not included. Consult with your agent on
                local broker co-op commissions.
              </p>
            </Col>
            <Col md={6}>
              <img
                className="rounded"
                src="https://www.lt6p.com/re/img/buysell/sellers_smiling_couple_new.jpg"
              ></img>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        className="fourth-section"
        style={{ display: isOpen || isSubmit ? "none" : "block" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={5} className="fourth-sec-heading">
              <h2>Connect With Local Agents</h2>
            </Col>
            <Col xs={2}></Col>
            <Col md={5}>
              <Form className="search-form">
                <Form.Control size="lg" type="text" placeholder="Search" />
                <Link to={"/agentslist"}>Search</Link>
              </Form>
            </Col>
          </Row>
          <Row>
            <div className="search-result">
              <h1>Agent Search</h1>
            </div>
            <Col md={3} className="agents-list">
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
            <Col md={3} className="agents-list">
              <ul>
                <li>Illinois</li>
                <li>Indiana</li>
                <li>Iowa</li>
                <li>Kansas</li>
                <li>Kentucky</li>
                <li>Louisiana</li>
                <li>Maine</li>
                <li>Maryland</li>
                <li>Massachusetts</li>
                <li>Michigan</li>
                <li>Minnesota</li>
                <li>Mississippi</li>
                <li>Missouri</li>
              </ul>
            </Col>
            <Col md={3} className="agents-list">
              <ul>
                <li>Montana</li>
                <li>Nebraska</li>
                <li>Nevada</li>
                <li>New Hampshire</li>
                <li>New Jersey</li>
                <li>New Mexico</li>
                <li>New York</li>
                <li>North Carolina</li>
                <li>North Dakota</li>
                <li>Ohio</li>
                <li>Oklahoma</li>
                <li>Oregon</li>
                <li>Pennsylvania</li>
              </ul>
            </Col>
            <Col md={3} className="agents-list">
              <ul>
                <li>
                  <Link to={"/singlepost"}>Rhode Island</Link>
                </li>
                <li>South Carolina</li>
                <li>South Dakota</li>
                <li>Tennessee</li>
                <li>Texas</li>
                <li>Utah</li>
                <li>Vermont</li>
                <li>Virginia</li>
                <li>Washington</li>
                <li>West Virginia</li>
                <li>Wisconsin</li>
                <li>Wyoming</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
