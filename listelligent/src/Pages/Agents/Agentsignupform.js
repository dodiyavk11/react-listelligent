import React, { useState, useEffect } from "react";
import "../../Style/Agents/agentsignupform.css";
import Layout from "../../components/Layouts/Layout";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";

const Agentsignupform = () => {
  const [values, setValues] = useState({
    name: "",
    license: "",
    brokerage: "",
    office_address: "",
    zip_code: "",
    email: "",
    role: "1",
    status: "0",
    password: "",
    termcondition: false,
  });
  const navigate = useNavigate();
  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}agentSignUp`,
        values
      );
      if (response.status) {
        NotificationManager.success("Signup", response.data.message, 1500);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        NotificationManager.error("Error", response.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };
  const formStyle = {
    border: "1px solid grey",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "6px 0px 17px 11px #80808047",
  };
  return (
    <Layout>
      <Container>
        <div className="agentSignUpForm p-3">
          <h1 className="text-center mb-4">Your professional details</h1>
          <NotificationContainer />
          <Form style={formStyle} onSubmit={handelSubmit}>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Full Name *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>License *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="00000000"
                    onChange={(e) =>
                      setValues({ ...values, license: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Brokerage *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Best Realty"
                    onChange={(e) =>
                      setValues({ ...values, brokerage: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Office address *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="199 Market St, San Francisco, CA"
                    onChange={(e) =>
                      setValues({ ...values, office_address: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Zip code *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="00000"
                    onChange={(e) =>
                      setValues({ ...values, zip_code: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Email *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Password *</b>
                  </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    type="checkbox"
                    name="termcondition"
                    // label="I agree to the terms and conditions"
                    label={
                      <Link
                        to="/your-terms-and-conditions-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        I agree to the terms and conditions
                      </Link>
                    }
                    checked={values.termcondition}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        termcondition: values.termcondition ? false : true,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <center>
                <Button
                  className="find-btn btn btn-primary"
                  type="submit"
                  size="lg"
                >
                  Signup
                </Button>{" "}
                <Button
                  className="find-btn btn btn-primary"
                  type="submit"
                  size="lg"
                >
                  <Link to={"/login"} className="text-white">Back to login</Link>
                </Button>
                </center>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </Layout>
  );
};

export default Agentsignupform;
