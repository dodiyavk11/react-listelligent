import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/Admin/Dashboardlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Card } from "react-bootstrap";

const Profile = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
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
        NotificationManager.success("Update", response.data.message, 1500);
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

  return (
    <Dashboardlayout>
      <Container fluid>
        <NotificationContainer />
        <Row>
          <Col md={12}>
            <Card className="mt-4 mb-4">
              <Card.Header>
                <h4>Profile</h4>
              </Card.Header>
              <Card.Body>
                <div
                  className="dataTable"
                  style={{ margin: "13px 0px" }}
                >                  
                  <div className="client-preference-content border p-3" style={{borderRadius: "10px" }}>                    
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
                            <h6>Email *</h6>
                          </div>
                        </Col>
                        <Col lg={8}>
                          <div className="preferences-checkbox mb-3">
                            <Form.Control
                              required
                              type="email"
                              name="email"
                              placeholder="Email"
                              disabled
                            //   onChange={(event) => handelInputUpdate(event)}
                              value={profileData.email}
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
                  <h4 className="mt-4">Chnage password</h4>
                  <div className="client-preference-content border mt-3 p-3" style={{borderRadius: "10px" }}>
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
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Dashboardlayout>
  );
};

export default Profile;
