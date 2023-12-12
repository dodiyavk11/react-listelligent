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
            <div className='form-box'>
                <h1>Login Account</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handelInput} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handelInput} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </Form.Group>
                    <Link onClick={handelSubmit} className='w-100 login'>LOGIN</Link>
                    <Link to={'/signup'} className='new-account'>Creat New Account</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login;