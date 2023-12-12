import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../../Style/Auth/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function register_validation(values){

    let error = {}

    if (values.name === ""){
        error.name = "Name should not be empty";
    }
    else{
        error.name = "";
    }

    if (values.email === ""){
        error.email = "Email should not be empty";
    }
    else{
        error.email = "";
    }

    if(values.password === ""){
        error.password = "Password should not be empty";
    }
    else{
        error.password = "";
    }

    return error;
}

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});
    const handelInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const navigate = useNavigate();
    const handelSubmit = (event) => {
        event.preventDefault();
        setErrors(register_validation(values));

        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:3001/signup', values)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/login');
                }
                else{
                    alert("User not register");
                }
            })
            .then(err => console.log(err));
        }
    }

    return (
        <div className='login-form-container'>
            <div className='form-box'>
                <h1>Create Account</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" onChange={handelInput}/>
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handelInput}/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handelInput}/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </Form.Group>
                    <Link onClick={handelSubmit} className='w-100 register'>REGISTER</Link>
                    <Link to={'/login'} className='alredy-account'>your alredy account?</Link>
                </Form>
            </div>
        </div>
    )
}

export default Signup;