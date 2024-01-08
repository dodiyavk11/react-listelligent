import React from "react";
import Layout from "../components/Layouts/Layout";
import "../Style/howitwork.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { AiFillPlayCircle } from "react-icons/ai";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import HowitWork from "../../src/assets/howitworks.png";
// Popup Video
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
          width="765px"
          controls
          autoPlay
        ></video>
      </Modal.Body>
    </Modal>
  );
}

const steps = [
  {
    label: "Insert your address and contact info",
    description: `That’s it. No lengthy questions, spam calls or time wasting. See who serves your
    area immediately.`,
  },
  {
    label: "Immediate Access to Agent Profile",
    description:
      "Once you’ve inserted your address you’ll be taken directly to the profiles of local agents. No further questionnaires or requirements ",
  },
  {
    label: "Connect",
    description: `View the agent(s) profile of your requested zip code. After reviewing, hit the Request Interview for a call or email from that agent.`,
  },
  {
    label: "List and Save!",
    description: `Congrtatulations on selling with your new agent! `,
  },
];

const Howitwork = () => {
  // Popup Video
  const [modalShow, setModalShow] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Layout>
      <div className="hiw-first-section">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <h3>How Listelligent Works</h3>
              <p>
                Save time and money by working with local experts that will list
                your home for 1%
              </p>
              <Form className="header-search">
                {/* <Form.Control size="lg" type="text" placeholder="Search" /> */}
                <Link to={"/agentslist"}>
                  GET STARTED
                  <HiOutlineArrowSmRight />
                </Link>
              </Form>
            </Col>
            <Col md={6} className="video-popup-container">
              <div className="video-popup">
                <img
                  src="https://www.lt6p.com/re/img/buysell/video_thumbnail_3.webp"
                  alt=""
                ></img>
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

      <div className="hiw-second-section">
        <Container>
          <Row>
            <Col lg={6}>
              <h3>How to get started:</h3>
              <Box sx={{ maxWidth: 600 }}>
                {/* <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label} className="hiw-step-label">
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
                              className="hiw-next-btn"
                              variant="contained"
                              onClick={handleNext}
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
                </Stepper> */}
                {steps.map((step, index) => (
                  <Stepper orientation="vertical">
                    <Step key={index} className="hiw-step-label">
                      <StepLabel>
                        <Typography>
                          <b>{step.label}</b>
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                      </StepContent>
                    </Step>
                  </Stepper>
                ))}
              </Box>
            </Col>
            <Col md={6}>
              <img src={HowitWork} alt="img" />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="hiw-third-section">
        <Container>
          <Row>
            <Col md={12} className="hiw-third-section-heading">
              <h1>Frequently Asked Questions</h1>
            </Col>
            <Col md={12} className="mt-5 p-0">
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="acordian-btn">
                    What is Listelligent?
                  </Accordion.Header>
                  <Accordion.Body>
                    Listelligent is a new platform that connects homeowners with
                    agents that can sell their home for a 1% commission.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="acordian-btn">
                    Are there any fees owed to Listelligent?
                  </Accordion.Header>
                  <Accordion.Body>
                    None! Listelligent is free for home sellers. Our mission is
                    to match you with local pros that are dedicated to selling
                    your home for 1%. This does not however include any buyer
                    agent commissions. Be sure to consult with your agent on any
                    broker Co-op.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="acordian-btn">
                    How is my information shared?
                  </Accordion.Header>
                  <Accordion.Body>
                    Your contact information is only shared with the agent(s) in
                    your desired zip code so they can reach out to introduce
                    themselves.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header className="acordian-btn">
                    What makes Listelligent different from other sites?
                  </Accordion.Header>
                  <Accordion.Body>
                    Most discount sites charge 1.5% to list a home. That’s due
                    to the sites taking a referral fee from the agent upon
                    close. Listelligent agents by into zip codes and are not
                    charged a referral fee saving you more money!
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header className="acordian-btn">
                    Is Listelligent nationwide?
                  </Accordion.Header>
                  <Accordion.Body>
                    Listelligent is available to sellers in all 50 states!
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header className="acordian-btn">
                    What about the buyers agent fees?
                  </Accordion.Header>
                  <Accordion.Body>
                    Each state has different guidelines regarding buyer broker
                    co-ops. Please consult with your agent to discuss buyer
                    agent fees.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header className="acordian-btn">
                    Is Listelligent a brokerage?
                  </Accordion.Header>
                  <Accordion.Body>
                    No. Listelligent is an online platform that connects you
                    with local agents/brokerages based on your desired zip code.
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

export default Howitwork;
