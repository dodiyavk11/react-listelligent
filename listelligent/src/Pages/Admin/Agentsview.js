import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/Admin/Dashboardlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import "../../Style/Admin/agentview.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Agentsview = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleApproveClick = async (id, status) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/approveAgent/${id}/${status}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        fetchAgentList();
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Status",
      selector: (row) => (row.status === 0 ? "Unapproved" : "Approved"),
    },
    {
      name: "Action",
      cell: (row) =>
        row.status === 0 ? (
          <Button
            variant="success"
            size="sm"
            onClick={() => handleApproveClick(row.id, 1)}
          >
            Aproove
          </Button>
        ) : (
          <Button
            variant="warning"
            size="sm"
            onClick={() => handleApproveClick(row.id, 0)}
          >
            Block
          </Button>
        ),
    },
  ];

  const [data, setData] = useState([]);

  const [records, setRecords] = useState(data);

  useEffect(() => {
    setRecords(data);
  }, [data]);

  function handlefilter(event) {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  const fetchAgentList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/list`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  };
  useEffect(() => {
    fetchAgentList();   
  }, []);

  return (
    <Dashboardlayout>
      <Container fluid>
        <NotificationContainer />
        <Row>
          {/* <Col md={1}></Col> */}
          <Col md={12}>
            <div className="dataTable">
              <div className="search-input">
                <h2>Agents List</h2>
                <Form.Control
                  className=""
                  type="text"
                  id="inputtext5"
                  placeholder="Search..."
                  onChange={handlefilter}
                />
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
  );
};

export default Agentsview;
