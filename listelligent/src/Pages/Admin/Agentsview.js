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
import { FaBan, FaCheck } from "react-icons/fa";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Card } from "react-bootstrap";

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
            title="Click to approve"
            variant="success"
            size="sm"
            onClick={() => handleApproveClick(row.id, 1)}
          >
            <FaCheck />
          </Button>
        ) : (
          <Button
            title="Click to Unapproved"
            variant="danger"
            size="sm"
            onClick={() => handleApproveClick(row.id, 0)}
          >
            <FaBan />
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
    const searchQuery = event.target.value.toLowerCase();

    const newData = data.filter((row) => {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          const valueString =
            typeof value === "string" || typeof value === "number"
              ? value.toString().toLowerCase()
              : "";
          if (valueString.includes(searchQuery)) {
            return true;
          }
        }
      }
      return false;
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
          <Col md={12}>
            <Card className="mt-4 mb-4">
              <Card.Header>
                <h4>Agents</h4>
              </Card.Header>
              <Card.Body>
                <div className="dataTable" style={{ margin: "13px 0px" }}>
                  <div
                    className="dataTableHeader"
                    style={{ margin: "13px 0px" }}
                  >
                    <Form.Control
                      className="shadow-none"
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
                    customStyles={{
                      headRow: {
                        style: {
                          fontSize: "18px",
                          fontWeight: "bolder",
                        },
                      },
                      rows: {
                        style: {
                          fontSize: "16px",
                        },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md={1}></Col> */}
        </Row>
      </Container>
    </Dashboardlayout>
  );
};

export default Agentsview;
