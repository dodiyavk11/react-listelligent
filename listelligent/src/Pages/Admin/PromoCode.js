import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/Admin/Dashboardlayout";
import "../../Style/Admin/zipcode.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Card } from "react-bootstrap";
import "../../Style/custom.css";

const PromoCode = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [promoCodeUpdate, setPromoCodeUpdate] = useState([]);

  const updatePromoCode = (row) => {
    setPromoCodeUpdate(row);
    setUpdateModal(true);
  };

  const [values, setValues] = useState({
    code: "",
    description: "",
    discount_amount: "",
  });

  const handelInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handelInputUpdate = (event) => {
    const { name, value } = event.target;
    setPromoCodeUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}admin/add/promocode`,
        {
          code: values.code,
          description: values.description,
          discount_amount: values.discount_amount,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        setModalShow(false);
        NotificationManager.success("Promo code", response.data.message, 1500);
        getPromoCode();
      } else {
        NotificationManager.error("Error", response.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };

  const handelUpdate = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}admin/promocode/${promoCodeUpdate.id}`,
        promoCodeUpdate,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        setUpdateModal(false);
        NotificationManager.success("Promo code", response.data.message, 1500);
        getPromoCode();
      } else {
        NotificationManager.error("Error", response.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };

  const deletePromoCode = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}admin/promocode/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        getPromoCode();
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

  const [data, setData] = useState([]);
  useEffect(() => {}, [data]);

  const getPromoCode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/promocode`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        setData(response.data.data);
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
  useEffect(() => {
    getPromoCode();
  }, []);

  return (
    <Dashboardlayout>
      <Container fluid>
        <NotificationContainer />
        <Row>
          <Col md={12}>
            <Card className="mt-4 mb-4">
              <Card.Header>
                <Row>
                  <Col md={11}>
                    <h4>Promo codes</h4>
                  </Col>
                  <Col md={1}>
                    <Button
                      title="Add Promo code"
                      size="sm"
                      variant="success"
                      onClick={() => setModalShow(true)}
                    >
                      <FaPlus />
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div className="datatable">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Promo code</th>
                        <th>Description</th>
                        <th>Discount amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.code}</td>
                          <td>{item.description}</td>
                          <td>{item.discount_amount}</td>
                          <td>
                            <Button
                              title="Edit"
                              className="m-1"
                              variant="warning"
                              size="sm"
                              onClick={() => updatePromoCode(item)}
                            >
                              <FaPencilAlt color="white" />
                            </Button>
                            <Button
                              title="Delete"
                              variant="danger"
                              className="m-1"
                              size="sm"
                              onClick={() => deletePromoCode(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Add Promo code model */}
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h3 className="zip-header">Add Promo code</h3>
            <Form onSubmit={handelSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Promo code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="code"
                  placeholder="Enter Promo code"
                  className="shadow-none"
                  onChange={handelInput}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  className="shadow-none"
                  onChange={handelInput}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="discount_amount"
                  placeholder="Enter amount"
                  className="shadow-none"
                  onChange={handelInput}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="status"
                  className="shadow-none"
                  onChange={handelInput}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Form.Control>
              </Form.Group> */}

              <div className="zip-submit-btn d-flex justify-content-end">
                <Button type="submit">Submit</Button>&nbsp;
                <span
                  className="btn btn-danger"
                  onClick={() => setModalShow(false)}
                >
                  Close
                </span>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        {/* end add Promo code modal */}
        {/* update Promo code modal */}
        <Modal
          size="lg"
          show={updateModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h3 className="zip-header">Update Promo code</h3>
            <Form onSubmit={handelUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Promo code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="code"
                  placeholder="Enter Promo code"
                  className="shadow-none"
                  onChange={handelInputUpdate}
                  value={promoCodeUpdate.code}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  className="shadow-none"
                  onChange={handelInputUpdate}
                  value={promoCodeUpdate.description}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Discount amount</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="discount_amount"
                  placeholder="Enter Amount"
                  className="shadow-none"
                  onChange={handelInputUpdate}
                  value={promoCodeUpdate.discount_amount}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="status"
                //   value={zipUpdateData.status}
                  className="shadow-none"
                  onChange={handelInputUpdate}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Form.Control>
              </Form.Group> */}

              <div className="zip-submit-btn d-flex justify-content-end">
                <Button type="submit">Update</Button> &nbsp;
                <span
                  className="btn btn-danger"
                  onClick={() => setUpdateModal(false)}
                >
                  Close
                </span>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </Dashboardlayout>
  );
};

export default PromoCode;
