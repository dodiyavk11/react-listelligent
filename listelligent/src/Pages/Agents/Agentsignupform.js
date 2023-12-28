import React, { useState, useEffect } from "react";
import "../../Style/Agents/agentsignupform.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";

function agent_register_validation(values) {
  let error = {};

  // Validate that each field is non-empty
  Object.keys(values).forEach((key) => {
    if (values[key] === "") {
      error[key] = `${key.replace("_", " ")} is required`;
    } else {
      error[key] = "";
    }
  });

  return error;
}

const Agentsignupform = () => {
  const [values, setValues] = useState({
    name: "",
    license: "",
    license_date: "",
    mls_id: "",
    brokerage: "",
    office_address: "",
    building: "",
    zip_code: "",
    hp_address: "",
    hp_zip_code: "",
    hp_sales_price: "",
    realtor_profile: "",
    email: "",
    role: "1",
    status: "0",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setErrors(agent_register_validation(values));
  }, [values]);
  const handelSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}agentSignUp`,
          values
        );
        if (response.status) {
          NotificationManager.success(
            "Signup",
            response.data.message,
            3000,
            () => {
              navigate("/login");
            }
          );
        } else {
          NotificationManager.error("Error", response.message, 3000);
        }
      } catch (error) {
        console.log(error);
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    } else {
      NotificationManager.error("Error", "All fields Are Reqiered!", 3000);
    }
  };

  return (
    <div className="page-content">
      <div className="form-v10-content">
        <Form className="form-detail" onSubmit={handelSubmit}>
          <Row>
            <Col md={6}>
              <NotificationContainer />
              <div className="form-left">
                <h2>Your professional details</h2>
                <div className="form-row">
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="shadow-none"
                      placeholder="Full Name"
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <span className="text-danger">{errors.name}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="00000000"
                      onChange={(e) =>
                        setValues({ ...values, license: e.target.value })
                      }
                    />
                    {errors.license && (
                      <span className="text-danger">{errors.license}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Label>License Date</Form.Label>
                    <input
                      id="formDate"
                      type="date"
                      placeholder="01/01/2012"
                      onChange={(e) =>
                        setValues({ ...values, license_date: e.target.value })
                      }
                    ></input>
                    {errors.license_date && (
                      <>
                        <br />
                        <span className="text-danger">
                          {errors.license_date}
                        </span>
                      </>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="MLS ID"
                      onChange={(e) =>
                        setValues({ ...values, mls_id: e.target.value })
                      }
                    />
                    {errors.mls_id && (
                      <span className="text-danger">{errors.mls_id}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="shadow-none"
                      placeholder="Brokerage"
                      onChange={(e) =>
                        setValues({ ...values, brokerage: e.target.value })
                      }
                    />
                    {errors.brokerage && (
                      <span className="text-danger">{errors.brokerage}</span>
                    )}
                  </Form.Group>
                </div>
                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="Add a Address"
                      onChange={(e) =>
                        setValues({ ...values, office_address: e.target.value })
                      }
                    />
                    {errors.office_address && (
                      <span className="text-danger">
                        {errors.office_address}
                      </span>
                    )}
                  </Form.Group>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="form-right">
                <h2>Your professional details</h2>
                <p>
                  In the past 12 months, what was the highest value property
                  sold by you?
                </p>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="Road, Building"
                      onChange={(e) =>
                        setValues({ ...values, building: e.target.value })
                      }
                    />
                    {errors.building && (
                      <span className="text-danger">{errors.building}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="zip-code"
                      onChange={(e) =>
                        setValues({ ...values, zip_code: e.target.value })
                      }
                    />
                    {errors.zip_code && (
                      <span className="text-danger">{errors.zip_code}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="Add a Address"
                      onChange={(e) =>
                        setValues({ ...values, hp_address: e.target.value })
                      }
                    />
                    {errors.hp_address && (
                      <span className="text-danger">{errors.hp_address}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="zip-code"
                      onChange={(e) =>
                        setValues({ ...values, hp_zip_code: e.target.value })
                      }
                    />
                    {errors.hp_zip_code && (
                      <span className="text-danger">{errors.hp_zip_code}</span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group as={Col}>
                    <Form.Control
                      className="shadow-none"
                      placeholder="last sales price"
                      onChange={(e) =>
                        setValues({ ...values, hp_sales_price: e.target.value })
                      }
                    />
                    {errors.hp_sales_price && (
                      <span className="text-danger">
                        {errors.hp_sales_price}
                      </span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="shadow-none"
                      placeholder="https://www.realtor.com/realestateagents/your_id"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          realtor_profile: e.target.value,
                        })
                      }
                    />
                    {errors.realtor_profile && (
                      <span className="text-danger">
                        {errors.realtor_profile}
                      </span>
                    )}
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group className="mb-3">
                    <Form.Control required
                      className="shadow-none"
                      type="email"
                      placeholder="email"
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </Form.Group>
                </div>
                <div className="form-row">
                  <Form.Group className="mb-3 d-none">
                    <Form.Control
                      className="shadow-none"
                      type="text"
                      placeholder="add a role"
                      onChange={(e) =>
                        setValues({ ...values, role: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group className="mb-3 d-none">
                    <Form.Control
                      className="shadow-none"
                      type="text"
                      placeholder="Status"
                      onChange={(e) =>
                        setValues({ ...values, status: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>

                <div className="form-row">
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="shadow-none"
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                    />
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </Form.Group>
                </div>
                <div className="submit-btn-container">
                  <Link onClick={handelSubmit}>Submit</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Agentsignupform;
