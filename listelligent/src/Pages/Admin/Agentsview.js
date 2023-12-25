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

    const handleApproveClick = (row) => {
        const agentEmail = row.email;
        const agentId = row.id;

        axios.post('http://localhost:3001/approveAgent', { id: agentId, email: agentEmail })
            .then(res => {
                if (res.data.Message === "Email Sent Successfully") {
                    alert("Account approval successful!");
                }
                // console.log("id :-" + res.data.id +"...."+"email :-" + res.data.email);
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
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Status',
            selector: row => (row.status == 0 ? 'Unapproved' : 'Approved'),
        },
        {
            name: 'Action',
            cell: row => (row.status == 0 ? <Button variant="success" size="sm" onClick={() => handleApproveClick(row)}>Aproove</Button> : <Button variant="warning" size="sm" disabled>Aprooved</Button>),
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
                    {/* <Col md={1}></Col> */}
                    <Col md={12}>
                        <div className='dataTable'>
                            <div className='search-input'>
                                <h2>Agents List</h2>
                                <Form.Control className='' type="text" id="inputtext5" placeholder='Search...' onChange={handlefilter} />
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
                    {/* <Col md={1}></Col> */}
                </Row>
            </Container>
        </Dashboardlayout>
    )
}

export default Agentsview;