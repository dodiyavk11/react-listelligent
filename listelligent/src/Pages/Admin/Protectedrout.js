import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protectedrout = (props) => {
  const { Component } = props;
  // const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token && isAdmin) {
      navigate("/");
      if (isAdmin === "agent") {
        // navigate("/agentDashboard");
        if (userData.status === 0) {
          navigate("/agent/purchase-zip");
        } else {
          navigate("/agentDashboard");
        }
      } else if (isAdmin === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    // axios.get('http://localhost:3001')
    //     .then(res => {
    //         if (res.data.Status === "Success" && res.data.role === "0") {
    //             // setAuth(true)
    //             navigate('/admin/dashboard');
    //         }
    //         else {
    //             // setAuth(false)
    //             // setMessage(res.data.Error)
    //             navigate('/');
    //         }
    //     })
    //     .then(err => console.log(err));
  }, []);

  return <Component />;
};

export default Protectedrout;
