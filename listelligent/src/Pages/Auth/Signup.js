import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../../Style/Auth/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function register_validation(values) {
  let error = {};

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }

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

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handelInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const navigate = useNavigate();
  const handelSubmit = (event) => {
    event.preventDefault();
    setErrors(register_validation(values));

    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3001/signup", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/login");
          } else {
            alert("User not register");
          }
        })
        .then((err) => console.log(err));
    }
  };

  return (
    <div className="login-form-container">
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-9">
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <div className="AppFormLeft">
                    <h1>Create Account</h1>
                    <Form>
                      <Form.Group className="position-relative mb-4">
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          onChange={handelInput}
                          className="form-control shadow-none form-input"
                        />
                        {errors.name && (
                          <span className="text-danger">{errors.name}</span>
                        )}
                      </Form.Group>

                      <Form.Group className="position-relative mb-4">
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

                      <Form.Group className="position-relative mb-4">
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

                      <Link
                        onClick={handelSubmit}
                        className="w-100 submit-btn btn-block shadow border-0 py-2 text-uppercase"
                      >
                        REGISTER
                      </Link>
                      <p className="text-center mt-5">
                        You have an alredy account?
                        <Link to={"/login"} className="alredy-account">
                          login to ckick here
                        </Link>
                      </p>
                    </Form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Create a Account With Listelligent
                    </h2>
                    <p>
                      Lorem ipsuing elit. Molomos totam est voluptatum i omos
                      totam est voluptatum i ure sit consectetur ill
                    </p>
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

export default Signup;
