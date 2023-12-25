import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgentProtectedR = (props) => {

    const { Component } = props;
    // const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                if (res.data.Status === "Success" && res.data.role === "1") {
                    // setAuth(true)
                    navigate('/agentDashboard');
                }
                else {
                    // setAuth(false)
                    // setMessage(res.data.Error)
                    navigate('/');
                }
            })
            .then(err => console.log(err));
    }, [])

    return (
        <Component />
    )
}

export default AgentProtectedR;