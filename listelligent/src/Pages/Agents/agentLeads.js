import React, { useState, useEffect } from "react";
import Agentlayout from "../../components/Agent/Agentlayout";
import {
  Row,
  Card,
  Container,
  Col,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../Style/Agents/agentproposal.css";
import "../../Style/custom.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import TimeAgo from "react-timeago";

// Header-Tabs
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

const AgentLeads = () => {
  // Header-Tabs
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tabvalue, tabsetValue] = React.useState(0);

  const tabhandleChange = (event, newValue) => {
    tabsetValue(newValue);
  };

  // Proposal-list-pagination and data
  const cardsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

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

  const [modalShow, setModalShow] = React.useState(false);

  const renderCards_list = () => {
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return data.slice(startIndex, endIndex).map((card, index) => (
      <div
        className={`proposal-list-card ${
          activeIndex === card.id ? "active" : ""
        }`}
        key={index}
        onClick={() => {
          setModalShow(true);
          cardClick(card);
        }}
      >
        <p>
          <span className="status-tag">
            {" "}
            <TimeAgo date={card.created_at} />
          </span>
        </p>
        <h3>{card.name}</h3>
        <p className="address">{card.address}</p>
        <p className="submited-date">Submitted on {card.created_at}</p>
      </div>
    ));
  };

  const nextPage = () => {
    if ((currentPage + 1) * cardsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [sellerSelectedCard, setSellerSelectedCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const cardClick = (card) => {
    setActiveIndex(card.id);
    setSellerSelectedCard(card);
  };
  const sellerSelectedCardDetails = () => {
    if (sellerSelectedCard) {
      return (
        <div className="proposal-list-content">
          <div className="client-details">
            <div className="client-details-heading">
              <h3>{sellerSelectedCard.name}</h3>
            </div>
            {/* <div className="client-details-btn">
              <Button>Archive</Button>
            </div> */}
          </div>

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className="client-detail-tab-contant"
            >
              <Tabs
                value={tabvalue}
                onChange={tabhandleChange}
                variant="scrollable"
                aria-label="basic tabs example"
              >
                <Tab
                  className="activityFeed-tab"
                  label="Lead info"
                  {...a11yProps(0)}
                />
                <Tab
                  className="ProposalOver-tab"
                  label="Tab"
                  {...a11yProps(1)}
                />
                <Tab
                  className="PropertyInfo-tab"
                  label="Tab"
                  {...a11yProps(2)}
                />
                <Tab className="Documents-tab" label="Tab" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabvalue} index={0} className="p-3">
              <div className="">
                <Container>
                  <Row>
                    <Col md={12}>
                      {/* <p>{sellerSelectedCard.name}</p>
                      <p>{sellerSelectedCard.phone}</p>
                      <p>{sellerSelectedCard.email}</p>
                      <p>{sellerSelectedCard.address}</p>
                      <p>{sellerSelectedCard.zip_code}</p> */}
                      <Card className="mb-4">
                        <Card.Body>
                          <Card.Title>
                            <b>Name : </b>
                            {sellerSelectedCard.name}
                          </Card.Title>
                          <Card.Text>
                            <b>Phone : </b>
                            {sellerSelectedCard.phone}
                          </Card.Text>
                          <Card.Text>
                            <b>Email : </b>
                            {sellerSelectedCard.email}
                          </Card.Text>
                          <Card.Text>
                            <b>Address : </b>
                            {sellerSelectedCard.address}
                          </Card.Text>
                          <Card.Text>
                            <b>Zip code : </b>
                            {sellerSelectedCard.zip_code}
                          </Card.Text>
                          <Card.Text>
                            <b>Created at : </b>
                            {sellerSelectedCard.created_at}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={tabvalue} index={1} className="p-3">
              <div className="commissions">
                {/* <Container>
                  <div className="commission">
                    <Row className="align-items-center">
                      <Col md={3}>
                        <h3>1.50%</h3>
                        <p>Listing Commission</p>
                      </Col>
                      <Col md={3}>
                        <h3>2.00%</h3>
                        <p>Buyside Commission</p>
                      </Col>
                      <Col md={3}>
                        <h3>3.50%</h3>
                        <p>Total Commission</p>
                      </Col>
                      <Col md={3}>
                        <Button>View Full Proposal</Button>
                      </Col>
                    </Row>
                  </div>

                  <div className="services">
                    <h3>
                      <TiMessages />
                      Services
                    </h3>
                    <Row>
                      <Col md={6}>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Professional Photos</span>
                          </div>
                          <div>
                            <span>Free</span>
                          </div>
                        </div>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Home Staging</span>
                          </div>
                          <div>
                            <span>Extra $</span>
                          </div>
                        </div>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Dedicated Website</span>
                          </div>
                          <div>
                            <span>Free</span>
                          </div>
                        </div>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Postcard and Flyers</span>
                          </div>
                          <div>
                            <span>Free</span>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Video Tour</span>
                          </div>
                          <div>
                            <span>Free</span>
                          </div>
                        </div>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Landscaping</span>
                          </div>
                          <div>
                            <span>Extra $</span>
                          </div>
                        </div>
                        <div className="services-option d-flex justify-content-between">
                          <div>
                            <span>Realtor.com</span>
                          </div>
                          <div>
                            <span>Free</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container> */}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={tabvalue} index={2} className="p-3">
              <div className="property-info">
                {/* <Container>
                  <Row>
                    <h1>6534 Persa St, Carlsbad, CA 92009</h1>
                    <Col md={6}>
                      <h4>$1.65M - $1.79M</h4>
                      <span>UpNest Estimate</span>

                      <div className="property-info-menu">
                        <IoHomeOutline />
                        <span>Single Family</span>
                      </div>
                      <div className="property-info-menu">
                        <IoIosResize />
                        <span>2432 sqft</span>
                      </div>
                      <div className="property-info-menu">
                        <LuBath />
                        <span>2 Baths</span>
                      </div>
                      <div className="property-info-menu">
                        <LiaBedSolid />
                        <span>4 Beds</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="property-info-box">
                        <h5>Showcase your high end home experience!</h5>
                        <p>
                          Sellers are ready to prepare their property for the
                          market. They would like to get professional advice on
                          market trends and pricing. They are looking for an
                          agent who can sell quickly for the highest net profit!
                          Adding a video greeting is a HUGE plus!
                        </p>
                      </div>
                      <div className="mt-3 admin-name">
                        <p>
                          <b>Johana Orozco</b> • UpNest Advisor
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container> */}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={tabvalue} index={3} className="p-3">
              {/* <div className="property-doc">
                <MdOutlineDocumentScanner />
                <span>Listing Agreement</span>
                <div className="listing-input">
                  <div class="file-input">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      class="file-input__input"
                    />
                    <label class="file-input__label" for="file-input">
                      <MdOutlineFileUpload />
                      <span>Upload file</span>
                    </label>
                  </div>
                  <p>Max file size: 10 MB</p>
                </div>
              </div>

              <div className="property-doc">
                <IoNewspaperOutline />
                <span>Closing Document</span>
                <div className="listing-input">
                  <div class="file-input">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      class="file-input__input"
                    />
                    <label class="file-input__label" for="file-input">
                      <MdOutlineFileUpload />
                      <span>Upload file</span>
                    </label>
                  </div>
                  <p>Max file size: 10 MB</p>
                </div>
              </div> */}
            </CustomTabPanel>
          </Box>
        </div>
      );
    } else if(data.length > 0) {
      return (
        <div className="proposal-list-content">
          <div className="client-details">
            <div className="client-details-heading">
              <h3>Select lead to preview here.</h3>
            </div>
          </div>
        </div>
      );
    }
    else{
        return (
            <div className="proposal-list-content">
              <div className="client-details">
                <div className="client-details-heading">
                <p>You dont have any purchased zip code leads {" "}
                <Button className="find-btn">
                    <Link to={"/agent/purchase-zip"} className="text-white">Buy zip code</Link>
                </Button></p>
                </div>
              </div>
            </div>
          );
    }
    return null;
  };

  // Popup-Box
  function MobilePopupBox(props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 767);
      };

      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);

      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }, []);

    if (!isMobile) {
      return null;
    }

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ maxWidth: "100%", width: "100%", margin: 0 }}
      >
        <Modal.Body closeButton>{sellerSelectedCardDetails()}</Modal.Body>
      </Modal>
    );
  }

  return (
    <Agentlayout>
      <div className="my-proposal-header agentLeads">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="proposel-header"
          >
            <Container>
              <NotificationContainer />
              <h2 className="text-white">Leads</h2>
              {/* <Row className="d-flex align-items-center">
                <Col lg={6}>
                  <Tabs
                    className="proposal-header-tabs align-items-center"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      className="seller-tab"
                      label="SELLERS"
                      {...a11yProps(0)}
                    />                   
                  </Tabs>
                </Col>
                <Col lg={6}>
                  
                </Col>
              </Row> */}
            </Container>
          </Box>
          <Container>
            <Row>
              <Col>
                <CustomTabPanel value={value} index={0}>
                  <div className="main-container">
                    <Container>
                      <Row>
                        <Col md={3} className="p-0">
                          <div
                            className="overflow-auto"
                            style={{ height: "800px" }}
                          >
                            <div
                              className="proposal-list-container"
                              style={{ borderRight: "4px solid #e3e3e3" }}
                            >
                              {renderCards_list()}
                              <MobilePopupBox
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                              />
                            </div>
                            {data.length > 0 &&
                            <div id="pagination-controls">
                              <button
                                className="pagination-prev"
                                onClick={previousPage}
                                disabled={currentPage === 0}
                              >
                                Previous
                              </button>
                              <button
                                className="pagination-next"
                                onClick={nextPage}
                                disabled={
                                  (currentPage + 1) * cardsPerPage >=
                                  data.length
                                }
                              >
                                Next
                              </button>
                            </div>
                            }
                          </div>
                        </Col>
                        <Col md={9} className="p-0">
                          {sellerSelectedCardDetails()}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </CustomTabPanel>
              </Col>
            </Row>
          </Container>
        </Box>
      </div>
    </Agentlayout>
  );
};

export default AgentLeads;
