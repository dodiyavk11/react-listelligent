import React from "react";
import Layout from "../../components/Layouts/Layout";
import "../../Style/Agents/howagentswork.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "react-bootstrap/Accordion";

// Video Popup
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <video
          src="https://video-cdn.ziggeo.com/v1/applications/e0601e02e994ce8d4763a3cff2190b09/videos/22ac617f5c89149b348bf33bb758b4be/video.mp4?force_refresh=false"
          controls
          autoPlay
          style={{ width: "100%" }}
        ></video>
      </Modal.Body>
    </Modal>
  );
}

// Agents Stepers Code
const steps = [
  {
    label: "Create a profile",
    description: `Agents, this is your time to shine. Use your profile to promote yourself as homeowners are looking at this to request a listing consultation`,
  },
  {
    label: "Agree to the terms and conditions",
    description:
      "We ask that you always honor the Listelligent offer of listing a home for 1%",
  },
  {
    label: "Claim your zip code(s)",
    description: `Each zip code will have a spot for 3 agents. You can purchase 1 slot or all 3 if you wish to be the sole agent of that territory. You have the option to own that zip code month to month or purchase it for a year.`,
  },
  {
    label: "Connect",
    description: `Reach out to sellers ASAP when you receive a request for a listing consultation.`,
  },
];

// Seller Stepers Code
const seller_steps = [
  {
    label: "Search",
    description: `Homeowners looking to sell their home for 1% start off by inputting their address and contact information.`,
  },
  {
    label: "Review",
    description:
      "After inputting their info they are immediately taken to the page that show cases the agent or agents who are in the desired zip code.",
  },
  {
    label: "Connect",
    description: `Homeowners can review their profile and request a call/text or email for a listing consultation`,
  },
];

const Howagentswork = () => {
  // Popup Video
  const [modalShow, setModalShow] = React.useState(false);

  // Agents Stepers
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Seller Stepers
  const [selleractiveStep, sellersetActiveStep] = React.useState(0);

  const sellerhandleNext = () => {
    sellersetActiveStep((sellerprevActiveStep) => sellerprevActiveStep + 1);
  };

  return (
    <Layout>
      <div className="hit-agents-f-section">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <h3>How Listelligent Work</h3>
              <p>
                Match with sellers looking to list for 1% No Referral Fees No
                Monthly Contracts
              </p>
            </Col>
            <Col md={6} className="agent-video-popup-container">
              <div className="agent-video-popup">
                <img src="https://www.lt6p.com/re/img/buysell/video_thumbnail_3.webp"></img>
                <Link onClick={() => setModalShow(true)}>
                  <AiFillPlayCircle />
                </Link>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="hiw-agent-second-section">
        <Container>
          <Row>
            <Col md={6}>
              <h1>How it works for Agents</h1>
              <div className="agent-step-container">
                <Box sx={{ maxWidth: 600 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label} className="hiw-agent-steps">
                        <StepLabel className="agent-steps-title">
                          {step.label}
                        </StepLabel>
                        <StepContent className="agent-steps-desc">
                          <Typography>{step.description}</Typography>
                          <Box sx={{ mb: 2 }}>
                            <div>
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                                className="hiw-agent-step-btn"
                              >
                                {index === steps.length - 1 ? "Finish" : "Next"}
                              </Button>
                            </div>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
            </Col>
            <Col md={6}>
              <h1>How it works for Sellers</h1>
              <div className="seller-step-container">
                <Box sx={{ maxWidth: 600 }}>
                  <Stepper activeStep={selleractiveStep} orientation="vertical">
                    {seller_steps.map((step, index) => (
                      <Step key={step.label} className="hiw-seller-steps">
                        <StepLabel className="seller-steps-title">
                          {step.label}
                        </StepLabel>
                        <StepContent className="seller-steps-desc">
                          <Typography>{step.description}</Typography>
                          <Box sx={{ mb: 2 }}>
                            <div>
                              <Button
                                variant="contained"
                                onClick={sellerhandleNext}
                                sx={{ mt: 1, mr: 1 }}
                                className="hiw-seller-step-btn"
                              >
                                {index === seller_steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </div>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="hiw-agent-third-section">
        <Container>
          <Row>
            <Col>
              <h1>FAQ</h1>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="hiw-agent-acordian-btn">
                    What is Listelligent?
                  </Accordion.Header>
                  <Accordion.Body>
                    Listelligent is a new platform that connects homeowners with
                    agents that can sell their home for a 1% commission.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="hiw-agent-acordian-btn">
                    Am I required to list for 1%?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes. Not all sellers can or want to pay more than 1%. We ask
                    that you honor the offer Listelligent provides.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="hiw-agent-acordian-btn">
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
                  <Accordion.Header className="hiw-agent-acordian-btn">
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
                  <Accordion.Header className="hiw-agent-acordian-btn">
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
                  <Accordion.Header className="hiw-agent-acordian-btn">
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
    </Layout>
  );
};

export default Howagentswork;
