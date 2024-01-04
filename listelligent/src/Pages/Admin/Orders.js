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

const Orders = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

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
      <Container>
        <NotificationContainer />
        <Row>
          <Col md={12}>
            <div className="dataTable" style={{margin:"13px 0px"}}>
              <div className="search-input">
                <h2>Orders</h2>
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
                            Total amount: &nbsp;<b>{data.total}</b>&nbsp;&nbsp;
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
                                  <Col lg={3} className="imp-doc-second-col">
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
                                    <Col lg={3} className="imp-doc-first-col">
                                      <p>{product.city}</p>
                                    </Col>
                                    <Col lg={3} className="imp-doc-second-col">
                                      <p>{product.zip_code}</p>
                                    </Col>
                                    <Col lg={3} className="imp-doc-third-col">
                                      <p>{product.price}</p>
                                    </Col>
                                    <Col lg={3} className="imp-doc-third-col">
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
          </Col>
        </Row>
      </Container>
    </Dashboardlayout>
  );
};

export default Orders;
