import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../components/Admin/Dashboardlayout';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../../Style/Admin/agentview.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Agentsview = () => {

    // const [approvalStatus, setApprovalStatus] = useState('');

    const handleApproveClick = (row) => {
        const agentEmail = row.email;
        axios.post('http://localhost:3001/approveAgent', { email: agentEmail })
            .then(res => {
                if (res.data.Message === "Email Sent Successfully") {
                    alert("Account approval successful!");
                    // setApprovalStatus('success');
                }
            })
            .catch(err => { console.error(err) });
    };

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'zip_code',
            selector: row => row.zip_code,
        },
        {
            name: 'email',
            selector: row => row.email,
        },
        {
            name: 'Action',
            cell: row => (
                <Button variant="primary" size="sm" onClick={() => handleApproveClick(row)}>Aproove</Button>
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
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setRecords(newData);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/agentsview')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <Dashboardlayout>
            <Container fluid>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <div className='dataTable'>
                            <div className='search-input'>
                                <h2>Agents List</h2>
                                <Form.Control type="text" id="inputtext5" placeholder='Search...' onChange={handlefilter} />
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
                    <Col md={1}></Col>
                </Row>
            </Container>
        </Dashboardlayout>
    )
}

export default Agentsview;