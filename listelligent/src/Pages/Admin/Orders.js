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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Accordion from "react-bootstrap/Accordion";
import TimeAgo from "react-timeago";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";

const Orders = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/status/order/${id}/${status}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.status) {
        getAdminOrderList();
        NotificationManager.success("Success", response.data.message, 3000);
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

  const getStatusDivStyle = (status) => {
    switch (status) {
      case 0:
        return { backgroundColor: "#6c757d", color: "#fff" }; // New
      case 1:
        return { backgroundColor: "#28a745", color: "#fff" }; // Complete
      case 2:
        return { backgroundColor: "#dc3545", color: "#fff" }; // Decline
      default:
        return { backgroundColor: "#6c757d", color: "#fff" }; // Unknown
    }
  };
  const getColor = (status) => {
    switch (status) {
      case 0:
        return { color: "#6c757d" }; // New
      case 1:
        return { color: "#28a745" }; // Complete
      case 2:
        return { color: "#dc3545" }; // Decline
      default:
        return { color: "#6c757d" }; // Unknown
    }
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Total amount",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user.name,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
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
            ? "Decline"
            : "Unknown"}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <DropdownButton id="dropdown-basic-button" variant="dark" title="Status">
          <Dropdown.Item onClick={() => handleStatusUpdate(row.id, 0)}>
            <span style={getColor(0)}>Pending</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleStatusUpdate(row.id, 1)}>
            <span style={getColor(1)}>Complete</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleStatusUpdate(row.id, 2)}>
            <span style={getColor(2)}>Decline</span>
          </Dropdown.Item>
        </DropdownButton>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);

  function handlefilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    const newData = data.filter((row) => {
      const rowValues = [
        ...Object.values(row),
        ...row.orderProduct.map((product) => Object.values(product)),
        Object.values(row.user),
      ].flat();

      return rowValues
        .filter((value) => value !== undefined && value !== null)
        .some((value) => value.toString().toLowerCase().includes(searchTerm));
    });

    setRecords(newData);
  }

  const getAdminOrderList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/orders`,
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
    getAdminOrderList();
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
                <h4>Orders</h4>
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
                    expandableRows
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
                    expandableRowsComponent={({ data }) => {
                      return (
                        <Accordion defaultActiveKey={0}>
                          <Accordion.Item
                            eventKey={0}
                            className="accordian-items"
                            style={styles}
                          >
                            <Accordion.Header>
                              <p>
                                Total amount: &nbsp;<b>{data.total}</b>
                                &nbsp;&nbsp;
                              </p>
                              <span className="status-tag mb-3">
                                <TimeAgo date={data.created_at} />
                              </span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="imp-doc-accordian">
                                {data.orderProduct.length > 0 && (
                                  <div className="cartItem mb-5">
                                    <Row className="pb-3 border-bottom align-items-center">
                                      <Col lg={3} className="imp-doc-first-col">
                                        <p>
                                          <b>City</b>
                                        </p>
                                      </Col>
                                      <Col
                                        lg={3}
                                        className="imp-doc-second-col"
                                      >
                                        <p>
                                          <b>Zip code</b>
                                        </p>
                                      </Col>
                                      <Col lg={3} className="imp-doc-third-col">
                                        <p>
                                          <b>Price</b>
                                        </p>
                                      </Col>
                                      <Col lg={3} className="imp-doc-third-col">
                                        <p>
                                          <b>Validity</b>
                                        </p>
                                      </Col>
                                    </Row>
                                    {data.orderProduct.map((product, index) => (
                                      <Row
                                        className="pb-3 border-bottom align-items-center"
                                        key={index}
                                      >
                                        <Col
                                          lg={3}
                                          className="imp-doc-first-col"
                                        >
                                          <p>{product.city}</p>
                                        </Col>
                                        <Col
                                          lg={3}
                                          className="imp-doc-second-col"
                                        >
                                          <p>{product.zip_code}</p>
                                        </Col>
                                        <Col
                                          lg={3}
                                          className="imp-doc-third-col"
                                        >
                                          <p>{product.price}</p>
                                        </Col>
                                        <Col
                                          lg={3}
                                          className="imp-doc-third-col"
                                        >
                                          <p>
                                            {product.start_date} -{" "}
                                            {product.end_date}
                                          </p>
                                        </Col>
                                      </Row>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
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

export default Orders;
