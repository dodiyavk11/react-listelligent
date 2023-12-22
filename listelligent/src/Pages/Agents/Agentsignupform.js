import React, { useState, useEffect } from 'react';
import '../../Style/Agents/agentsignupform.css';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function agent_register_validation(values) {

    let error = {}

    if (values.name === "") {
        error.name = "Name is reqiured";
    }
    else {
        error.name = "";
    }

    if (values.license === "") {
        error.license = "license is reqiured";
    }
    else {
        error.license = "";
    }

    if (values.license_date === "") {
        error.license_date = "license_date is reqiured";
    }
    else {
        error.license_date = "";
    }

    if (values.mls_id === "") {
        error.mls_id = "mls_id is reqiured";
    }
    else {
        error.mls_id = "";
    }

    if (values.brokerage === "") {
        error.brokerage = "brokerage is reqiured";
    }
    else {
        error.brokerage = "";
    }

    if (values.office_address === "") {
        error.office_address = "office_address is reqiured";
    }
    else {
        error.office_address = "";
    }

    if (values.building === "") {
        error.building = "building is reqiured";
    }
    else {
        error.building = "";
    }

    if (values.zip_code === "") {
        error.zip_code = "zip_code is reqiured";
    }
    else {
        error.zip_code = "";
    }

    if (values.hp_address === "") {
        error.hp_address = "hp_address is reqiured";
    }
    else {
        error.hp_address = "";
    }

    if (values.hp_zip_code === "") {
        error.hp_zip_code = "hp_zip_code is reqiured";
    }
    else {
        error.hp_zip_code = "";
    }

    if (values.hp_sales_price === "") {
        error.hp_sales_price = "hp_sales_price is reqiured";
    }
    else {
        error.hp_sales_price = "";
    }

    if (values.realtor_profile === "") {
        error.realtor_profile = "realtor_profile is reqiured";
    }
    else {
        error.realtor_profile = "";
    }

    if (values.email === "") {
        error.email = "email is reqiured";
    }
    else {
        error.email = "";
    }

    return error;
}


const Agentsignupform = () => {

    const [values, setValues] = useState({
        name: '',
        license: '',
        license_date: '',
        mls_id: '',
        brokerage: '',
        office_address: '',
        building: '',
        zip_code: '',
        hp_address: '',
        hp_zip_code: '',
        hp_sales_price: '',
        realtor_profile: '',
        email: '',
        role: '1',
        status: '0',
        password: '',
    })

    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    function hideShow() {
        if (errors.name === "" && errors.license === "" && errors.license_date === "" && errors.mls_id === "" && errors.brokerage === "" && errors.office_address === "" && errors.building === "" && errors.zip_code === "") {
            setIsOpen(true);
        }
        else {
            setErrors(agent_register_validation(values));
        }
    }

    const navigate = useNavigate();

    const handelSubmit = (event) => {
        event.preventDefault();
        setErrors(agent_register_validation(values));

        if (errors.name === "" && errors.license === "" && errors.license_date === "" && errors.mls_id === "" && errors.brokerage === "" && errors.office_address === "" && errors.building === "" && errors.zip_code === "" && errors.hp_address === "" && errors.hp_zip_code === "" && errors.hp_sales_price === "" && errors.realtor_profile === "" && errors.email === "") {
            axios.post('http://localhost:3001/agentsignupform', values)
                .then(res => {
                    if (res.data.Status === "Success") {
                        navigate('/');
                    }
                    else {
                        alert("Agent Data Was Not Send");
                    }
                })
                .then(err => console.log(err));
        }
        else {
            alert("All Fields Are Reqiered!");
        }
    }

    return (
        <div className='agentform-container'>

            <div className='agentform-box'>
                <h1>Your professional details</h1>
                <Form>
                    {!isOpen
                        ?
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name *</Form.Label>
                                <Form.Control onChange={e => setValues({ ...values, name: e.target.value })} />
                                {errors.name && <span className='text-danger'>{errors.name}</span>}
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>License *</Form.Label>
                                    <Form.Control placeholder="00000000" onChange={e => setValues({ ...values, license: e.target.value })} />
                                    {errors.license && <span className='text-danger'>{errors.license}</span>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label for="formDate">License Date *</Form.Label>
                                    <input id="formDate" type='date' placeholder="01/01/2012" onChange={e => setValues({ ...values, license_date: e.target.value })}></input>
                                    {errors.license_date && <span className='text-danger'>{errors.license_date}</span>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>MLS ID *</Form.Label>
                                    <Form.Control placeholder="MLS ID" onChange={e => setValues({ ...values, mls_id: e.target.value })} />
                                    {errors.mls_id && <span className='text-danger'>{errors.mls_id}</span>}
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Brokerage *</Form.Label>
                                <Form.Control placeholder="Best Realty" onChange={e => setValues({ ...values, brokerage: e.target.value })} />
                                {errors.brokerage && <span className='text-danger'>{errors.brokerage}</span>}
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Office address *</Form.Label>
                                    <Form.Control placeholder="199 Market St, San Francisco, CA" onChange={e => setValues({ ...values, office_address: e.target.value })} />
                                    {errors.office_address && <span className='text-danger'>{errors.office_address}</span>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Suite, Building #</Form.Label>
                                    <Form.Control onChange={e => setValues({ ...values, building: e.target.value })} />
                                    {errors.building && <span className='text-danger'>{errors.building}</span>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Zip code *</Form.Label>
                                    <Form.Control placeholder="00000" onChange={e => setValues({ ...values, zip_code: e.target.value })} />
                                    {errors.zip_code && <span className='text-danger'>{errors.zip_code}</span>}
                                </Form.Group>
                            </Row>
                            <Link onClick={hideShow}>Next</Link>
                        </>
                        :
                        <>
                            <p>In the past 12 months, what was the highest value property sold by you? *</p>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Address *</Form.Label>
                                    <Form.Control placeholder="199 Market St, San Francisco, CA" onChange={e => setValues({ ...values, hp_address: e.target.value })} />
                                    {errors.hp_address && <span className='text-danger'>{errors.hp_address}</span>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label for="formDate">Zip code *</Form.Label>
                                    <Form.Control placeholder="00000" onChange={e => setValues({ ...values, hp_zip_code: e.target.value })} />
                                    {errors.hp_zip_code && <span className='text-danger'>{errors.hp_zip_code}</span>}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Sales Price *</Form.Label>
                                    <Form.Control placeholder="$0" onChange={e => setValues({ ...values, hp_sales_price: e.target.value })} />
                                    {errors.hp_sales_price && <span className='text-danger'>{errors.hp_sales_price}</span>}
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Realtor.com Profile</Form.Label>
                                <Form.Control placeholder="https://www.realtor.com/realestateagents/your_id" onChange={e => setValues({ ...values, realtor_profile: e.target.value })} />
                                {errors.realtor_profile && <span className='text-danger'>{errors.realtor_profile}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" onChange={e => setValues({ ...values, email: e.target.value })} />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Role *</Form.Label>
                                <Form.Control type="text" placeholder="add a role" onChange={e => setValues({ ...values, role: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status *</Form.Label>
                                <Form.Control type="text" placeholder="Status" onChange={e => setValues({ ...values, status: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} />
                            </Form.Group>

                            <Link onClick={handelSubmit}>Submit</Link>
                        </>
                    }
                </Form>
            </div>
        </div>
    )
}

export default Agentsignupform;