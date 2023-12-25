import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../components/Admin/Dashboardlayout';
import '../../Style/Admin/zipcode.css';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


function Validation(values) {

    let error = {}

    if (values.zip === "") {
        error.zip = "Zip should not be empty";
    }
    else {
        error.zip = "";
    }

    if (values.prize === "") {
        error.prize = "Prize should not be empty";
    }
    else {
        error.prize = "";
    }

    if (values.status === "") {
        error.status = "Status should not be empty";
    }
    else {
        error.status = "";
    }

    return error;
}



const ZipCode = () => {

    const [modalShow, setModalShow] = React.useState(false);

    function ZipCodeModel(props) {

        const [values, setValues] = useState({
            zip: '',
            prize: '',
            status: ''
        })

        const [errors, setErrors] = useState({});
        const handelInput = (event) => {
            setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
        }

        const handelSubmit = (event) => {
            event.preventDefault();
            setErrors(Validation(values));

            if (errors.zip === "" && errors.prize === "" && errors.status === "") {
                axios.post('http://localhost:3001/submitzip', values)
                    .then(res => {
                        if (res.data.Status === "Success") {
                            setModalShow(false);
                        }
                    })
                    .then(err => console.log(err));
            }
        }

        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <h3 className='zip-header'>Add Zip-Code</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" name="zip" placeholder="Enter Zip-Code" className='shadow-none' onChange={handelInput} />
                            {errors.zip && <span className='text-danger'>{errors.zip}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Prize</Form.Label>
                            <Form.Control type="text" name="prize" placeholder="Enter Prize" className='shadow-none' onChange={handelInput} />
                            {errors.prize && <span className='text-danger'>{errors.prize}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" placeholder="Set Status" className='shadow-none' onChange={handelInput} />
                            {errors.status && <span className='text-danger'>{errors.status}</span>}
                        </Form.Group>

                        <div className='zip-submit-btn d-flex justify-content-end'>
                            <Button onClick={handelSubmit}>Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }


    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Zip-Code',
            selector: row => row.zip_code,
            sortable: true,
        },
        {
            name: 'Prize',
            selector: row => row.prize,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            cell: row => (
                <div style={{ width: '50%' }} className='d-flex justify-content-between w-50%'>
                    <Button variant="warning" size="sm" className="mr-2">Update</Button>
                    <Button variant="danger" size="sm">Delete</Button>
                </div>
            ),
        },
    ];

    const [data, setData] = useState([]);

    const [records, setRecords] = useState(data);

    useEffect(() => {
        setRecords(data);
    }, [data]);

    function handlefilter(event) {
        const newData = data.filter(row => {
            return row.zip_code.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setRecords(newData);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/viewzip')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <Dashboardlayout>
            <Container fluid>
                <Row>
                    <Col>
                        <div className='zip-code-datatable'>
                            <div className='dataTableHeader'>
                                <h2>Zip-Code List</h2>
                                <Form.Control className='' type="text" id="inputtext5" placeholder='Search...' onChange={handlefilter} />
                                <Button variant="success" onClick={() => setModalShow(true)}>Add Zip Code</Button>
                                <ZipCodeModel show={modalShow} onHide={() => setModalShow(false)} />
                            </div>
                            <DataTable
                                columns={columns}
                                data={records}
                                selectableRows
                                pagination
                                highlightOnHover
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Dashboardlayout>
    )
}

export default ZipCode;