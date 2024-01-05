import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/Admin/Dashboardlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "react-notifications/lib/notifications.css";
import Badge from "react-bootstrap/Badge";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Accordion from "react-bootstrap/Accordion";
import TimeAgo from "react-timeago";
import { Card } from "react-bootstrap";

const Leads = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const getStatusDivStyle = (status) => {
    switch (status) {
      case 0:
        return { backgroundColor: "#6c757d", color: "#fff" }; // New
      case 1:
        return { backgroundColor: "#28a745", color: "#fff" }; // Complete
      case 2:
        return { backgroundColor: "#17a2b8", color: "#fff" }; // Accept
      case 3:
        return { backgroundColor: "#dc3545", color: "#fff" }; // Decline
      default:
        return { backgroundColor: "#6c757d", color: "#fff" }; // Unknown
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
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Zip code",
      selector: (row) => row.zip_code,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Created at",
      selector: (row) => <TimeAgo date={row.created_at} />,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <div
          style={{
            padding: "4px",
            borderRadius: "4px",
            ...getStatusDivStyle(row.status),
          }}
        >
          {row.status === 0
            ? "New"
            : row.status === 1
            ? "Complete"
            : row.status === 2
            ? "Accept"
            : row.status === 3
            ? "Decline"
            : "Unknown"}
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);

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

  const getAdminLeadsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/leads`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      setData(response.data.data);
      setRecords(response.data.data);
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
    getAdminLeadsList();
  }, []);
  const styles = {
    border: "1px solid #2222225c",
  };
  return (
    <Dashboardlayout>
      <Container fluid>
        <NotificationContainer />
        <Row>
          <Col md={12}>
            <Card className="mt-4 mb-4">
              <Card.Header>
                <h4>Leads</h4>
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
                    // selectableRows
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
        </Row>
      </Container>
    </Dashboardlayout>
  );
};

export default Leads;
