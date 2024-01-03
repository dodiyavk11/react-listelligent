import React from "react";
import "../../Style/Agents/agentperformance.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Agentlayout from "../../components/Agent/Agentlayout";
import Button from "react-bootstrap/Button";
import { FcCancel } from "react-icons/fc";
import { TbBulb } from "react-icons/tb";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdLock } from "react-icons/md";

const Agentperformance = () => {
  return (
    <Agentlayout>
      <div>
        <Container>
          <Row className="mt-4">
            <Col md={12}>
              <div className="performance">
                <h3>Performance</h3>
                <p>
                  These metrics affect your ranking in our matching algorithm
                </p>
              </div>
            </Col>
            <hr></hr>
          </Row>
        </Container>
      </div>

      {/* <div className='needs-attention'>
                <Container>
                    <Row>
                        <h3>Needs attention</h3>
                        <Col md={12}>
                            <div className='performance-box'>
                                <Row>
                                    <Col md={2}>
                                        <h6>Interview to Win</h6>
                                    </Col>
                                    <Col md={10}>
                                        <p>How often you win clients after they interview you over the last 12 months.</p>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <div className='average-div'>
                                            <div className='number'>
                                                <h4>33%</h4>
                                            </div>
                                            <div className='average'>
                                                <FcCancel /><span>Below average (80%)</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='action-wrapper'>
                                            <Button><TbBulb />Tips & FAQ</Button>
                                            <Button><BsFillQuestionCircleFill />I need Help</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <div className='going-well mt-4'>
                <Container>
                    <Row>
                        <h3>Going Well</h3>
                        <Col md={12}>
                            <div className='performance-box'>
                                <Row>
                                    <Col md={2}>
                                        <h6>Call Rate</h6>
                                    </Col>
                                    <Col md={10}>
                                        <p>Percentage of clients who received a call after requesting it over the last 12 months.</p>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <div className='average-div'>
                                            <div className='number'>
                                                <h4>100%</h4>
                                            </div>
                                            <div className='average'>
                                                <IoCheckmarkCircleOutline /><span>Above average (70%)</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='action-wrapper'>
                                            <Button><TbBulb />Tips & FAQ</Button>
                                            <Button><BsFillQuestionCircleFill />I need Help</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className='performance-box'>
                                <Row>
                                    <Col md={2}>
                                        <h6>Call Time</h6>
                                    </Col>
                                    <Col md={10}>
                                        <p>How quickly you call clients back over the last 12 months. (Average time)</p>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <div className='average-div'>
                                            <div className='number'>
                                                <h4>16 min</h4>
                                            </div>
                                            <div className='average'>
                                                <IoCheckmarkCircleOutline /><span>Faster than average (90 min)</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='action-wrapper'>
                                            <Button><TbBulb />Tips & FAQ</Button>
                                            <Button><BsFillQuestionCircleFill />I need Help</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className='performance-box'>
                                <Row>
                                    <Col md={2}>
                                        <h6>Expired rate</h6>
                                    </Col>
                                    <Col md={10}>
                                        <p>How often requests expire before you submit a proposal over the last 12 months.</p>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <div className='average-div'>
                                            <div className='number'>
                                                <h4>0%</h4>
                                            </div>
                                            <div className='average'>
                                                <IoCheckmarkCircleOutline /><span>Below average (7%)</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='action-wrapper'>
                                            <Button><TbBulb />Tips & FAQ</Button>
                                            <Button><BsFillQuestionCircleFill />I need Help</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className='performance-box'>
                                <Row>
                                    <Col md={2}>
                                        <h6>Update Rate</h6>
                                    </Col>
                                    <Col md={10}>
                                        <p>How often you report on client updates over the last 12 months.</p>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <div className='average-div'>
                                            <div className='number'>
                                                <h4>100%</h4>
                                            </div>
                                            <div className='average'>
                                                <IoCheckmarkCircleOutline /><span>Above average (87%)</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='action-wrapper'>
                                            <Button><TbBulb />Tips & FAQ</Button>
                                            <Button><BsFillQuestionCircleFill />I need Help</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='locked'>
                <Container>
                    <Row>
                        <h3>Locked</h3>
                        <Col md={12}>
                            <div className='performance-box'>
                                <Row>
                                    <Col md={2}>
                                        <h6>List to Close</h6>
                                    </Col>
                                    <Col md={10}>
                                        <p>How many average days from listing to closing on your UpNest sales over the last 12 months.</p>
                                    </Col>
                                    <hr></hr>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <div className='average-div'>
                                            <div className='average'>
                                                <MdLock /><span>Unlocks after you sell your first home.</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='action-wrapper'>
                                            <Button><TbBulb />Tips & FAQ</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <div className='badges'>
                <Container>
                    <Row>
                        <Col>
                            <div className='badge-header'>
                                <h3>Badges</h3>
                                <hr></hr>
                                <p>Collecting badges is a great way to improve your matching ranking</p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={3}>
                            <div className='badge-box'>
                                <img src='https://www.lt6p.com/re/img/badge_new/marketing-pro-badge.svg'></img>
                                <h4>Marketing Pro</h4>
                                <p>Filled out 100% of the public profile.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='badge-box'>
                                <img src='https://www.lt6p.com/re/img/badge_new/time-saver-badge.svg'></img>
                                <h4>Time Saver</h4>
                                <p>Enabled Immediate Proposals.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='badge-box'>
                                <img src='https://www.lt6p.com/re/img/badge_new/video-savvy-badge.svg'></img>
                                <h4>Video Savvy</h4>
                                <p>Sent 10 proposals with a video greeting attached.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='badge-box'>
                                <img src='https://www.lt6p.com/re/img/badge_new/fast-payment-badge.svg'></img>
                                <h4>Fast Payment</h4>
                                <p>Pays referral fee, on average, within 30 days of the sale.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col lg={3}>
                            <div className='badge-box'>
                                <img src='https://www.lt6p.com/re/img/badge_new/locked-badge.svg'></img>
                                <h4>Loan Facilitator</h4>
                                <p>Requested at least 5 Pre-Approval letters from buyers.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div> */}
    </Agentlayout>
  );
};

export default Agentperformance;
