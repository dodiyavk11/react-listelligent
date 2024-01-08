import React, { useState, useEffect } from "react";
import "../../Style/Agents/agentaccount.css";
import Agentlayout from "../../components/Agent/Agentlayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FiArrowLeft } from "react-icons/fi";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FaCheck } from "react-icons/fa";
import dayjs from "dayjs";
import { useNavigate, Link } from "react-router-dom";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Agentaccount = () => {
  const navigate = useNavigate();
  const [activeZip, setActiveZipCode] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const authToken = localStorage.getItem("token");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [changePassword, setChangePassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}agent/active/zipCode`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        if (response.status) {
          setActiveZipCode(response.data.data);
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

    const userProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}user/profile`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        if (response.status) {
          setProfileData(response.data.data);
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
    userProfile();
    fetchData();
  }, []);

  const handelInputUpdate = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}user/update/profile`,
        profileData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Signup", response.data.message, 1500);
      } else {
        NotificationManager.error("Error", response.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };

  const handelChangePasswrod = async (event) => {
    event.preventDefault();

    if (changePassword.confirm_password !== changePassword.new_password) {
      NotificationManager.error(
        "Error",
        "The New password confirmation does not match.",
        3000
      );
      return;
    }
    if (
      changePassword.confirm_password.length < 8 ||
      changePassword.new_password.length < 8
    ) {
      NotificationManager.error(
        "Error",
        "Password must be at least 8 characters long.",
        3000
      );
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/password-change`,
        changePassword,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Password", response.data.message, 1500);
      } else {
        NotificationManager.error("Error", response.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  // toggle-btn element hide and show
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // date-picker
  const [value, setValue] = React.useState([
    dayjs("2023-12-21"),
    dayjs("2024-01-14"),
  ]);

  const [activeTab, setActiveTab] = useState("8");
  const handleLiClick = (tab) => {
    console.log(tab);
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <Agentlayout>
      <div className="account-header-container">
        <Container>
          <NotificationContainer />
          <Row>
            <Col>
              <div className="account-header">
                <Button>
                  <FiArrowLeft />
                  <Link to={"/agentDashboard"}>Go back to Dashboard</Link>
                </Button>
                <h1>Account Settings</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="account-forms">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="acoount-tabs">
                <h5>MY ACCOUNT</h5>
                <ul>
                  <li
                    type="button"
                    onClick={() => handleLiClick("8")}
                    className={activeTab === "8" ? "active" : ""}
                  >
                    Purchased Zip code
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("0")}
                    className={activeTab === "0" ? "active" : ""}
                  >
                    My profile
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("10")}
                    className={activeTab === "10" ? "active" : ""}
                  >
                    Change password
                  </li>
                  {/* <li
                    type="button"
                    onClick={() => handleLiClick("0")}
                    className={activeTab === "0" ? "active" : ""}
                  >
                    Client Preferences
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("1")}
                    className={activeTab === "1" ? "active" : ""}
                  >
                    Contact Info
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("2")}
                    className={activeTab === "2" ? "active" : ""}
                  >
                    Additional Contact Info
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("3")}
                    className={activeTab === "3" ? "active" : ""}
                  >
                    Password
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("4")}
                    className={activeTab === "4" ? "active" : ""}
                  >
                    Brokerage Information
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("5")}
                    className={activeTab === "5" ? "active" : ""}
                  >
                    Away Status
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("6")}
                    className={activeTab === "6" ? "active" : ""}
                  >
                    Notifications
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLiClick("7")}
                    className={activeTab === "7" ? "active" : ""}
                  >
                    Important Documents
                  </li> */}
                </ul>
              </div>
            </Col>
            <Col lg={9}>
              <div className="account-content">
                <Accordion activeKey={activeTab}>
                  <Accordion.Item eventKey="8" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("8")}>
                      Purchased Zip code &nbsp;&nbsp;
                      <Link to={"/agent/purchase-zip"}>Buy more</Link>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="imp-doc-accordian">
                        {activeZip.length > 0 && (
                          <div className="cartItem mb-5">
                            <Row className="pb-3 border-bottom align-items-center">
                              <Col lg={3} className="imp-doc-first-col">
                                <p>
                                  <b>City</b>
                                </p>
                              </Col>
                              <Col lg={3} className="imp-doc-second-col">
                                <p>
                                  <b>Zip code</b>
                                </p>
                              </Col>
                              <Col lg={3} className="imp-doc-third-col">
                                <p>
                                  <b>Price</b>
                                </p>
                              </Col>
                              <Col lg={3} className="imp-doc-third-col">
                                <p>
                                  <b>Validity</b>
                                </p>
                              </Col>
                            </Row>
                            {activeZip.map((result, index) => (
                              <Row
                                className="pb-3 border-bottom align-items-center"
                                key={index}
                              >
                                <Col lg={3} className="imp-doc-first-col">
                                  <p>{result.city}</p>
                                </Col>
                                <Col lg={3} className="imp-doc-second-col">
                                  <p>{result.zip_code}</p>
                                </Col>
                                <Col lg={3} className="imp-doc-third-col">
                                  <p>{result.price}</p>
                                </Col>
                                <Col lg={3} className="imp-doc-third-col">
                                  <p>
                                    {result.start_date} - {result.end_date}
                                  </p>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="0" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("0")}>
                      My profile
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="client-preference-content">
                        <Form onSubmit={handelSubmit}>
                          <Row className="border-bottom">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>Full name</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  type="text"
                                  placeholder="Full name"
                                  required
                                  name="name"
                                  onChange={(event) => handelInputUpdate(event)}
                                  value={profileData.name}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="border-bottom mt-3">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>License *</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  required
                                  name="license"
                                  placeholder="00000000"
                                  onChange={(event) => handelInputUpdate(event)}
                                  value={profileData.license}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="border-bottom mt-3">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>Brokerage *</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  required
                                  name="brokerage"
                                  placeholder="Best Realty"
                                  onChange={(event) => handelInputUpdate(event)}
                                  value={profileData.brokerage}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="border-bottom mt-3">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>Office address *</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  required
                                  name="office_address"
                                  placeholder="199 Market St, San Francisco, CA"
                                  onChange={(event) => handelInputUpdate(event)}
                                  value={profileData.office_address}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="border-bottom mt-3">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>Zip code *</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  required
                                  name="zip_code"
                                  type="number"
                                  placeholder="00000"
                                  onChange={(event) => handelInputUpdate(event)}
                                  value={profileData.zip_code}
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="mt-3">
                            <Button className="form-submit-btn" type="submit">
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="10" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("10")}>
                      Change password
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="client-preference-content">
                        <Form onSubmit={handelChangePasswrod}>
                          <Row className="border-bottom">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>Current password</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  type="password"
                                  placeholder="Current password"
                                  required
                                  name="currentpassword"
                                  onChange={(e) =>
                                    setChangePassword({
                                      ...changePassword,
                                      current_password: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="border-bottom mt-3">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>New password</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  required
                                  name="newpassword"
                                  type="password"
                                  placeholder="New password"
                                  onChange={(e) =>
                                    setChangePassword({
                                      ...changePassword,
                                      new_password: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="border-bottom mt-3">
                            <Col lg={4}>
                              <div className="preferences-title">
                                <h6>Confirm password *</h6>
                              </div>
                            </Col>
                            <Col lg={8}>
                              <div className="preferences-checkbox mb-3">
                                <Form.Control
                                  required
                                  type="password"
                                  name="confirmpassword"
                                  placeholder="Confirm password"
                                  onChange={(e) =>
                                    setChangePassword({
                                      ...changePassword,
                                      confirm_password: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="mt-3">
                            <Button className="form-submit-btn" type="submit">
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* <Accordion.Item eventKey="0" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("0")}>
                      Client Preferences
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="client-preference-content">
                        <Row className="border-bottom">
                          <Col lg={4}>
                            <div className="preferences-title">
                              <h6>Seller Preferences</h6>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="preferences-checkbox">
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicCheckbox"
                              >
                                <Form.Check
                                  type="checkbox"
                                  label="Enable price range (Minimum price)"
                                />
                                <Form.Label className="ps-4 mt-3">
                                  Enable price range (Maximum price)
                                </Form.Label>
                              </Form.Group>
                            </div>
                          </Col>
                          <Col lg={5}>
                            <div className="preferences-input">
                              <Form.Group className="mb-4">
                                <Form.Control
                                  type="text"
                                  placeholder="$500,000"
                                />
                              </Form.Group>

                              <Form.Group className="mb-4">
                                <Form.Control
                                  type="text"
                                  placeholder="$3000,000"
                                />
                              </Form.Group>
                            </div>
                          </Col>
                        </Row>

                        <Row className="border-bottom mt-3">
                          <Col lg={4}>
                            <div className="preferences-title">
                              <h6>Buyer Preferences</h6>
                            </div>
                          </Col>
                          <Col lg={8}>
                            <div className="preferences-checkbox">
                              <Form.Group className="mb-5">
                                <Form.Check
                                  className="mb-3"
                                  type="checkbox"
                                  label="Work with buyers"
                                />
                                <Form.Check
                                  className="mb-3"
                                  type="checkbox"
                                  label="Work with a minimum price"
                                />

                                <Form.Group className="mb-4">
                                  <Form.Control
                                    type="text"
                                    placeholder="$600,000"
                                  />
                                </Form.Group>
                              </Form.Group>
                            </div>
                          </Col>
                        </Row>

                        <Row className="border-bottom mt-3">
                          <Col lg={4}>
                            <div className="preferences-title">
                              <h6>Service Areas</h6>
                            </div>
                          </Col>
                          <Col lg={8}>
                            <div className="service-area-content">
                              <p>Work in these cities</p>
                              <p>7/7</p>
                            </div>
                            <p className="service-area-p">
                              You can add up to 7 service cities. Adding more
                              service cities increases your chances of getting
                              more leads
                            </p>
                            <FormControl sx={{ m: 1, width: 300 }}>
                              <InputLabel id="demo-multiple-chip-label">
                                Chip
                              </InputLabel>
                              <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              >
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <p className="service-area-p">
                              Don't work in these cities
                            </p>
                            <select
                              className="form-select mb-4"
                              aria-label="Default select example"
                            >
                              <option selected>Select...</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </Col>
                        </Row>

                        <div className="form-submit-btn-contener">
                          <Button className="form-submit-btn">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("1")}>
                      Contact Info
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="contact-info">
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Justin S. Santolaya"
                            />
                          </Form.Group>
                          <Row className="mb-3 border-bottom">
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="justinsantolaya@hotmail.com"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Mobile Phone</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="(619) 206-9633"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="form-submit-btn-contener">
                            <Button className="form-submit-btn">
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("2")}>
                      Additional Contact Info
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="additional-contact-info">
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Justin S. Santolaya"
                            />
                          </Form.Group>
                          <Row className="mb-3 border-bottom">
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="justinsantolaya@hotmail.com"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Mobile Phone</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="(619) 206-9633"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="form-submit-btn-contener">
                            <Button className="form-submit-btn">
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("3")}>
                      Password
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="password-accordion">
                        <Form className="border-bottom">
                          <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="email" placeholder="" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Repeat new Password</Form.Label>
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>
                        </Form>
                        <div className="form-submit-btn-contener">
                          <Button className="form-submit-btn">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("4")}>
                      Brokerage Information
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="brokerage-info-contener">
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Brokerage</Form.Label>
                            <Form.Control type="text" placeholder="NextHome" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="2173 Salk Ave"
                            />
                          </Form.Group>
                          <Row className="mb-3">
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Unit / Suite</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Unit / Suite"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Zip code</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Zip code"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="mb-3 border-bottom">
                            <Col lg={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Managing Broker Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Richard Kuan"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Managing Broker Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="ginniemac@gmail.com"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Managing Broker Phone</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="7605797378"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Check
                            className="mb-3"
                            type="checkbox"
                            label="Do you work from home? Add a secondary office address"
                          />
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Secondary Office Address"
                            />
                          </Form.Group>
                          <Row className="mb-3 border-bottom">
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Unit / Suite</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Unit / Suite"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Zip code</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Zip code"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="form-submit-btn-contener">
                            <Button className="form-submit-btn">
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("5")}>
                      Away Status
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="pb-4 away-status-contener border-bottom">
                        <p>
                          You can turn on away status and set a date range if
                          you are not able to service the referrals.
                        </p>
                        <label className="toggler-wrapper style-1">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <div className="toggler-slider">
                            <div className="toggler-knob"></div>
                          </div>
                        </label>

                        {isChecked && (
                          <div className="toggle-content">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={[
                                  "DateRangePicker",
                                  "DateRangePicker",
                                ]}
                              >
                                <DemoItem
                                  label="Time range"
                                  component="DateRangePicker"
                                >
                                  <DateRangePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>

                            <Form.Check
                              className="mb-3 mt-3"
                              type="checkbox"
                              label="Stop receiving referral leads"
                            />
                            <Form.Check
                              className="mb-3"
                              type="checkbox"
                              label="Stop receiving all communications, emails, and SMS (including active leads)"
                            />
                          </div>
                        )}
                      </div>
                      <div className="form-submit-btn-contener">
                        <Button className="form-submit-btn">
                          Save Changes
                        </Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="6" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("6")}>
                      Notifications
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="notification border-bottom">
                        <Form.Check
                          className="mb-4"
                          type="checkbox"
                          label="Notify me via emails"
                        />
                        <Form.Check
                          className="mb-4"
                          type="checkbox"
                          label="Notify me via text messages"
                        />
                        <Form.Check
                          className="mb-4"
                          type="checkbox"
                          label="Enable push notification for desktop device"
                        />
                      </div>
                      <div className="form-submit-btn-contener">
                        <Button className="form-submit-btn">
                          Save Changes
                        </Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="7" className="accordian-items">
                    <Accordion.Header onClick={() => handleLiClick("7")}>
                      Important Documents
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="imp-doc-accordian">
                        <Row className="pb-3 border-bottom align-items-center">
                          <Col lg={4} className="imp-doc-first-col">
                            <p>Seller Referral Agreement</p>
                          </Col>
                          <Col lg={4} className="imp-doc-second-col">
                            <p>
                              <FaCheck />
                              Signed by agent and broker
                            </p>
                          </Col>
                          <Col lg={4} className="imp-doc-third-col">
                            <Button>Re-sign</Button>
                            <Button>Download</Button>
                          </Col>
                        </Row>
                        <Row className="pb-3 pt-3 border-bottom align-items-center">
                          <Col lg={4} className="imp-doc-first-col">
                            <p>Buyer Referral Agreement</p>
                          </Col>
                          <Col lg={4} className="imp-doc-second-col">
                            <p>
                              <FaCheck />
                              Signed by agent and broker
                            </p>
                          </Col>
                          <Col lg={4} className="imp-doc-third-col">
                            <Button>Re-sign</Button>
                            <Button>Download</Button>
                          </Col>
                        </Row>
                        <Row className="pb-3 pt-3 border-bottom align-items-center justify-content-between">
                          <Col lg={6} className="w9-form-col">
                            <p>W-9 Form</p>
                          </Col>
                          <Col lg={6} className="w9-btn-col">
                            <Button>Download</Button>
                          </Col>
                        </Row>
                        <Row className="pb-5 pt-3 align-items-center justify-content-between">
                          <Col lg={7} className="imp-doc-first-col">
                            <p>Commission Disbursement Authorization Form</p>
                          </Col>
                          <Col lg={5} className="imp-doc-third-col">
                            <Button>Download Sell</Button>
                            <Button>Download Buy</Button>
                          </Col>
                        </Row>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item> */}
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Agentlayout>
  );
};

export default Agentaccount;
