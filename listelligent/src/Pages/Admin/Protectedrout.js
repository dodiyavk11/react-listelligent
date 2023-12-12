import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Protectedrout = (props) => {
    
    const { Component } = props;
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    navigate('/admin/dashboard');
                }
                else {
                    setAuth(false)
                    // setMessage(res.data.Error)
                    navigate('/login');
                }
            })
            .then(err => console.log(err));
    }, [])

    return (
        <Component />
    )
}

export default Protectedrout;