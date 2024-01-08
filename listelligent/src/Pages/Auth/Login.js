import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../../Style/Auth/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function Validation(values) {
  let error = {};

  if (values.email === "") {
    error.email = "Email should not be empty";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else {
    error.password = "";
  }

  return error;
}

const Login = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { isAuthenticated, role } = useAuth();
  const handelInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handelSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // if (errors.email === "" && errors.password === "") {
    //   axios
    //     .post(`${process.env.REACT_APP_BASE_URL}login`, values)
    //     .then((res) => {
    //       if (res.data.token) {
    //         localStorage.setItem("email", res.data.data.email);
    //         localStorage.setItem("token", res.data.token);
    //         localStorage.setItem("isAdmin", res.data.data.isAdmin);
    //         localStorage.setItem("isLoggedIn", true);
    //         localStorage.setItem("userData", JSON.stringify(res.data.data));
    //         if (res.data.data.role === 0) {
    //           localStorage.setItem("isAdmin", "admin");
    //           login("admin");
    //           navigate("/admin/dashboard");
    //         } else if (res.data.data.role === 1) {
    //           localStorage.setItem("isAdmin", "agent");
    //           login("agent");
    //           navigate("/agentDashboard");
    //         }
    //       }
    //     })
    //     .then((err) => console.log(err));
    // }
  };
  useEffect(() => {
    if (errors.email === "" && errors.password === "") {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}login`, values)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("email", res.data.data.email);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAdmin", res.data.data.isAdmin);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userData", JSON.stringify(res.data.data));
            if (res.data.data.role === 0) {
              localStorage.setItem("isAdmin", "admin");
              login("admin");
              navigate("/admin/dashboard");
            } else if (res.data.data.role === 1) {
              localStorage.setItem("isAdmin", "agent");
              login("agent");
              navigate("/agent/purchase-zip");
              //   navigate("/agentDashboard");
            }
          }
        })
        .catch((err) =>
          NotificationManager.error("Error", err.response.data.message, 3000)
        );
    }
  }, [errors, navigate, login, values]);
  return (
    <div className="login-form-container">
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-9">
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <div className="AppFormLeft">
                    <h1>Login Account</h1>
                    <NotificationContainer />
                    <Form>
                      <Form.Group
                        className="position-relative mb-4"
                        controlId="formBasicEmail"
                      >
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handelInput}
                          className="form-control shadow-none form-input"
                        />
                        {errors.email && (
                          <span className="text-danger">{errors.email}</span>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="position-relative mb-4"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handelInput}
                          className="form-control shadow-none form-input"
                        />
                        {errors.password && (
                          <span className="text-danger">{errors.password}</span>
                        )}
                      </Form.Group>

                      <div className="row  mt-4 mb-4">
                        <div className="col-md-6">
                          <Form.Check type="checkbox" label="Remember me" />
                        </div>
                        <div className="col-md-6 text-right">
                          <Link className="forgot-password" style={{textWrap:"nowrap"}}>
                            Forgot Password?
                          </Link>
                        </div>
                      </div>

                      <Link
                        onClick={handelSubmit}
                        className="w-100 submit-btn btn-block shadow border-0 py-2 text-uppercase"
                      >
                        LOGIN
                      </Link>
                      <p className="text-center mt-5">
                        Don't have an account? &nbsp;
                        <Link to={"/agentsignupform"} className="new-account">
                          Create
                        </Link>
                      </p>
                    </Form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Login With Listelligent
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
