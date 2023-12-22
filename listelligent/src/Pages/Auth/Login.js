import React from 'react';
import Form from 'react-bootstrap/Form';
import '../../Style/Auth/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Validation(values) {

    let error = {}

    if (values.email === "") {
        error.email = "Email should not be empty";
    }
    else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    }
    else {
        error.password = "";
    }

    return error;
}

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })


    const [errors, setErrors] = useState({});
    const handelInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handelSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:3001/login', values)
                .then(res => {
                    if (res.data.Status === "Success") {
                        navigate('/admin/dashboard');
                    }
                    else {
                        alert(res.data.Error);
                    }
                })
                .then(err => console.log(err));
        }
    }

    return (
        <div className='login-form-container'>
            <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-9">
                        <div class="AppForm shadow-lg">
                            <div class="row">
                                <div class="col-md-6 d-flex justify-content-center align-items-center">
                                    <div class="AppFormLeft">
                                        <h1>Login Account</h1>

                                        <Form>
                                            <Form.Group className="position-relative mb-4" controlId="formBasicEmail">
                                                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handelInput} className='form-control shadow-none form-input' />
                                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                                            </Form.Group>

                                            <Form.Group className="position-relative mb-4" controlId="formBasicPassword">
                                                <Form.Control type="password" name="password" placeholder="Password" onChange={handelInput} className='form-control shadow-none form-input' />
                                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                                            </Form.Group>

                                            <div class="row  mt-4 mb-4">
                                                <div class="col-md-6">
                                                    <Form.Check type="checkbox" label="Remember me" />
                                                </div>
                                                <div class="col-md-6 text-right">
                                                    <Link className='forgot-password'>Forgot Password?</Link>
                                                </div>
                                            </div>

                                            <Link onClick={handelSubmit} className='w-100 submit-btn btn-block shadow border-0 py-2 text-uppercase'>LOGIN</Link>
                                            <p class="text-center mt-5">Don't have an account?
                                                <Link to={'/signup'} className='new-account'>Creat New Account</Link>
                                            </p>
                                        </Form>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                                        <h2 class="position-relative px-4 pb-3 mb-4">Login With Listelligent</h2>
                                        <p>Lorem ipsuing elit. Molomos totam est voluptatum i omos totam est voluptatum i ure sit consectetur ill</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;