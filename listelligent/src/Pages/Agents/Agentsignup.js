import React from "react";
import Layout from "../../components/Layouts/Layout";
import "../../Style/Agents/Agentsignup.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { FaFileContract } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { CiMobile2 } from "react-icons/ci";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "react-bootstrap/Accordion";
import agentsignup_page_img from "../../assets/agentsignup_page_img.jpg";

const steps = [
  {
    label: "Create a Listelligent profile",
  },
  {
    label: "Accept terms and conditions",
  },
  {
    label: "Click How It Works to learn about the platform",
  },
  // {
  //     label: 'Claim zip codes',
  // }
];

const Agentsignup = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Layout>
      <div className="agent-header">
        <Container>
          <Row>
            <Col md={6}>
              <h1>Sell More Homes</h1>
              <p>No Referral Fees</p>
              <p>No Monthly Contracts</p>
              <div className="button">
                <Link to={"/agentsignupform"}>
                  Join Listelligent&nbsp;
                  <FaArrowRight />
                </Link>
              </div>
              <div className="button">
                <Link to={"/login"}>
                 Login&nbsp;
                  <FaArrowRight />
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <img alt="agent" src={agentsignup_page_img} width={550}></img>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="agentsign-first-section">
        <Container>
          <Row>
            <Col md={12}>
              <h1>
                Sign up with Listelligent and help homeowners list their home!
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="reason-item">
                <Row>
                  <Col md={1}>
                    <PiPlugsConnectedBold />
                  </Col>
                  <Col md={11}>
                    <h4>Connect with more sellers</h4>
                    <p>
                      Connect with sellers that need an agent to list for 1%.
                    </p>
                  </Col>
                </Row>
              </div>

              <div className="reason-item">
                <Row>
                  <Col md={1}>
                    <FaHandshake />
                  </Col>
                  <Col md={11}>
                    <h4>Earn more referrals</h4>
                    <p>
                      Build relationships with more people to expand your
                      referral business.
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={6}>
              <div className="reason-item">
                <Row>
                  <Col md={1}>
                    <FaFileContract />
                  </Col>
                  <Col md={11}>
                    <h4>No Contracts</h4>
                    <p>
                      You can buy into a zip code month to month and cancel any
                      time.
                    </p>
                  </Col>
                </Row>
              </div>
              <div className="reason-item">
                <Row>
                  <Col md={1}>
                    <CiMobile2 />
                  </Col>
                  <Col md={11}>
                    <h4>No referral fees…ever</h4>
                    <p>
                      Any lead you get from Listelligent is yours for life. If
                      they sell, buy and sell again you keep 100% of the
                      commissions!
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="agentsign-second-section">
        <Container>
          <Row>
            <Col md={6}>
              <h1>Getting Started With Listelligent</h1>
              <Box sx={{ maxWidth: 600 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label} className="agent-step-label">
                      <StepLabel
                        className="steplabels"
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
                              variant="contained"
                              sx={{ mt: 1, mr: 1 }}
                              className="signup-btn"
                            >
                              {/* {index === steps.length - 1
                                ? "Finish"
                                : "Sign up Now"}                               */}
                              {index === steps.length - 1 ? (
                                <>Finish</>
                              ) : (
                                <Link to="/agentsignupform" className="text-white">Sign up Now</Link>
                              )} &nbsp;
                              <FaArrowRight />
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Col>
            <Col md={6}>Listelligent Video</Col>
          </Row>
        </Container>
      </div>

      <div className="agentsign-third-section">
        <Container>
          <Row>
            <Col>
              <h1>Frequently Asked Questions</h1>
              <Accordion defaultActiveKey="0" className="accordian-container">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="agent-sign-acordian-btn">
                    What is Listelligent?
                  </Accordion.Header>
                  <Accordion.Body>
                    Listelligent is a new platform that connects homeowners with
                    agents that can sell their home for a 1% commission.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="agent-sign-acordian-btn">
                    Am I required to list for 1%?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes. Not all sellers can or want to pay more than 1%. We ask
                    that you honor the offer Listelligent provides.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="agent-sign-acordian-btn">
                    Are there any referral fees owed to Listelligent?
                  </Accordion.Header>
                  <Accordion.Body>
                    None! Most online platforms will take a referral fee upon
                    close and any other business that lead generates. Not on
                    Listelligent. So, if the client sells or buys multiple
                    times, you keep 100%.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header className="agent-sign-acordian-btn">
                    How do I buy zip codes?
                  </Accordion.Header>
                  <Accordion.Body>
                    Once you create a profile you can start purchasing zip
                    codes. You can buy a share of a zip code or the whole zip.
                    We offer two options which are: month to month or 1 year
                    upfront for a discount.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header className="agent-sign-acordian-btn">
                    What makes Listelligent different from other sites?
                  </Accordion.Header>
                  <Accordion.Body>
                    We have reduced the amount of steps it takes for sellers to
                    get to an agent and begin conversation. Most sites flood the
                    seller with questions or calls prior to even getting to the
                    agent's profile. Our process is simple. Enter address,
                    contact info and they immediately get matched with the agent
                    in that zip code.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header className="agent-sign-acordian-btn">
                    Is Listelligent nationwide?
                  </Accordion.Header>
                  <Accordion.Body>
                    Listelligent is available to sellers in all 50 states!
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="agentsign-fourth-section">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={7}>
              <h1>Ready to take on more listings?</h1>
            </Col>
            <Col md={5}>
              <div>
                <Link to={"/agentsignupform"}>
                  Join Listelligent
                  <FaArrowRight />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Agentsignup;
