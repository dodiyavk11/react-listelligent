import React, { useState, useEffect } from "react";
import Agentlayout from "../../components/Agent/Agentlayout";
import "../../Style/Agents/agentdashboard.css";
import { useNavigate, Link } from "react-router-dom";
import { FaChalkboardUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FaAngleDown } from "react-icons/fa6";
import { LuPhoneIncoming } from "react-icons/lu";
import { MdOutlineSettingsPhone } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import CircularProgress from "@mui/material/CircularProgress";
import TimeAgo from "react-timeago";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import {
  Dropdown,
  DropdownButton,
  Button,
  ProgressBar,
  Col,
  Row,
  Container,
} from "react-bootstrap";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Progress-bar-code
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const Agentdashboard = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAgentLeads = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/leads`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.status) {
        // NotificationManager.success("Success", response.data.message, 3000);
        setData(response.data.data);
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  };
  useEffect(() => {
    getAgentLeads();
  }, []);

  // Progress-bar-code
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/lead/update/${id}/${status}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  };

  return (
    <Agentlayout>
      <div className="proposal_search_form_container mt-4">
        <Container>
          <NotificationContainer/>
          <Row className="mb-3">
            <Col lg={6}>
              <div
                className="proposal_search_form"
                style={{ justifyContent: "left" }}
              >
                {/* <span>Proposals</span> */}
                <input
                  type="text"
                  placeholder="Search for a Name, Phone #, Email or Address"
                  className="ps-4 pt-1 pb-1"
                ></input>
                <button>Go</button>
              </div>
            </Col>
            <Col lg={6}>
              {/* <div className="filters-menu-container">
                <span className="filters-menu">
                  <FaChalkboardUser />
                  <Link>All Sellers</Link>
                </span>
                <span className="filters-menu">
                  <MdOutlineShoppingCart />
                  <Link>All Buyers</Link>
                </span>
                <span className="filters-menu">
                  <IoArchiveOutline />
                  <Link>Archived</Link>
                </span>
                <span className="filters-menu">
                  <MdOutlineRemoveRedEye />
                  <Link>Clients' Activities</Link>
                </span>
              </div> */}
            </Col>
          </Row>
          <hr />
        </Container>
      </div>

      <div className="tab-containt">
        <Container>
          <Row>
            <Col md={12}>
              <Box sx={{ width: "100%" }}>
                {/* <Box>
                  <Tabs
                    className="dashboard-tabs"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      className="seller-btn"
                      label="SELLERS"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className="buyer-btn"
                      label="BUYERS"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box> */}

                <CustomTabPanel value={value} index={0}>
                  <Container>
                    <Row>
                      {data.slice(0, 3).map((result, index) => (
                        <Col md={4} key={index}>
                          <div className="seller-proposals">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="status-span">
                                <TimeAgo date={result.created_at} />
                              </span>
                              <span>
                                <DropdownButton
                                  id="dropdown-basic-button"
                                  variant="light"
                                  split
                                >
                                  <Dropdown.Item
                                    disabled={result.status === 1}
                                    onClick={() =>
                                      handleStatusUpdate(result.id, 1)
                                    }
                                  >
                                    Complete
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    disabled={result.status === 2}
                                    onClick={() =>
                                      handleStatusUpdate(result.id, 2)
                                    }
                                  >
                                    Accept
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    disabled={result.status === 3}
                                    onClick={() =>
                                      handleStatusUpdate(result.id, 3)
                                    }
                                  >
                                    Decline
                                  </Dropdown.Item>
                                </DropdownButton>
                              </span>
                              {/* <span className="icon-span">
                              <RiDeleteBin6Line />
                            </span> */}
                            </div>
                            <div>
                              <h5>{result.name}</h5>
                              <p>{result.address}</p>
                              <p>
                                <b>{result.phone}</b>
                              </p>
                              <p>
                                <b>{result.email}</b>
                              </p>
                              <p>Submitted on {result.created_at}</p>
                            </div>
                            {/* <div className="card-btn">
                            <Button className="leave-btn">Leave Update</Button>
                            <Button className="view-proposal">
                              View Proposal
                            </Button>
                          </div> */}
                          </div>
                        </Col>
                      ))}
                    </Row>

                    <Button className="load-more-btn">
                      <Link to={"/leads"}>View all</Link>
                    </Button>
                  </Container>
                </CustomTabPanel>

                {/* Buyers Tab */}
                <CustomTabPanel value={value} index={1}>
                  <Container>
                    <Row>
                      <Col md={4}>
                        <div className="seller-proposals">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="status-span">Submited</span>
                            <span className="icon-span">
                              <RiDeleteBin6Line />
                            </span>
                          </div>
                          <div>
                            <h5>Cassandra Szaras</h5>
                            <p>6534 Persa St, Carlsbad, CA 92009</p>
                            <p>Estimate $1.65M - $1.79M</p>
                            <p>Submitted on 11/28/2023 7:09 AM</p>
                          </div>
                          <div className="card-btn">
                            <Button className="leave-btn">Leave Update</Button>
                            <Button className="view-proposal">
                              View Proposal
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="seller-proposals">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="status-span">Submited</span>
                            <span className="icon-span">
                              <RiDeleteBin6Line />
                            </span>
                          </div>
                          <div>
                            <h5>John Heiler</h5>
                            <p>3042 Starry Night Dr, Escondido, CA 92029</p>
                            <p>Estimate $1M - $2M</p>
                            <p>Submitted on 11/04/2023 11:46 AM</p>
                          </div>
                          <div className="card-btn">
                            <Button className="leave-btn">Leave Update</Button>
                            <Button className="view-proposal">
                              View Proposal
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="seller-proposals">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="status-span">Submited</span>
                            <span className="icon-span">
                              <RiDeleteBin6Line />
                            </span>
                          </div>
                          <div>
                            <h5>Rachel Lannin</h5>
                            <p>1172 Ocelot Ave, Chula Vista, CA 91911</p>
                            <p>Estimate $470K - $539K</p>
                            <p>Submitted on 10/30/2023 7:25 PM</p>
                          </div>
                          <div className="card-btn">
                            <Button className="leave-btn">Leave Update</Button>
                            <Button className="view-proposal">
                              View Proposal
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Button className="load-more-btn">+ Load More</Button>
                  </Container>
                </CustomTabPanel>
              </Box>
            </Col>

            {/* <Col md={8}></Col> */}
          </Row>
        </Container>
      </div>

      {/* <div className="template-container">
        <Container>
          <Row className="box-shadow">
            <Col md={6} className="border1">
              <div className="seller-proposal-tem">
                <div className="seller-proposal-left">
                  <h5>Seller Proposal Template</h5>
                  <span>
                    <IoIosCheckmarkCircle />
                    Completed
                  </span>
                </div>
                <div className="tem-status-content">
                  <p className="tem-status">IMMEDIATE PROPOSALS ON</p>
                  <p>Score 88 / 100</p>
                  <div className="d-flex justify-content-end mt-3 seller-tem">
                    <Button>Edit Template</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="buyer-proposal-tem">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Buyer Proposal Template</h5>
                  </div>
                  <div>
                    <p className="tem-status">IMMEDIATE PROPOSALS ON</p>
                  </div>
                </div>
                <p className="progressbar">
                  100% Your Buyer Proposal Template is up and running!
                </p>
                <ProgressBar now={100} />
                <div className="d-flex justify-content-end mt-3 seller-tem">
                  <Button>Edit Template</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}

      {/* <div className="performance-container">
        <Container>
          <Row>
            <Col>
              <h5>Performance</h5>
              <p>These metrics affect your ranking in our matching algorithm</p>
              <hr></hr>
            </Col>
          </Row>

          <Row>
            <Col lg={3}>
              <div className="performance-card">
                <div className="performance-card-top">
                  <span>
                    <MdOutlineMessage />
                  </span>
                  <h5>Interview to Win</h5>
                  <p>How often you win clients once they interview you.</p>
                </div>
                <div className="performance-card-bottom">
                  <h1>33%</h1>
                  <p>
                    <FaAngleDown />
                    Which is under average (80%)
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="performance-card">
                <div className="performance-card-top">
                  <span>
                    <LuPhoneIncoming />
                  </span>
                  <h5>Call Rate</h5>
                  <p>
                    Percentage of clients who received a call after requesting a
                    call.
                  </p>
                </div>
                <div className="performance-card-bottom">
                  <h1>100%</h1>
                  <p>
                    <FaAngleDown />
                    Which is over average (70%)
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="performance-card">
                <div className="performance-card-top">
                  <span>
                    <MdOutlineSettingsPhone />
                  </span>
                  <h5>Call Time</h5>
                  <p>How quickly you called clients back.</p>
                </div>
                <div className="performance-card-bottom">
                  <h1>16 min</h1>
                  <p>
                    <FaAngleDown />
                    Which is faster than average (90 min)
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="last-performance-card">
                <div className="last-performance-card-icon">
                  <span>
                    <IoIosMore />
                  </span>
                </div>
                <div className="last-performance-card-btn">
                  <Button>
                    Show all metrics
                    <GoArrowRight />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}

      {/* <div className="profile">
        <Container>
          <Row>
            <Col>
              <h3>Profile</h3>
              <hr></hr>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="profile-card">
                <div>
                  <p>Profile</p>
                  <CircularProgressWithLabel value={progress} />
                  <p>
                    <span>
                      Your agent profile strength is 100%. Keep your profile up
                      to date to increase chance of winning.
                    </span>
                  </p>
                  <Button>
                    Edit Profile
                    <GoArrowRight />
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="status-card">
                <p>Status</p>
                <p>
                  <span>Set status Away</span>
                </p>
                <input type="date"></input>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
    </Agentlayout>
  );
};

export default Agentdashboard;
