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

const FAQs = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [faqsUpdate, setFaqsUpdate] = useState([]);

  const updateFaqs = (row) => {
    setFaqsUpdate(row);
    setUpdateModal(true);
  };

  const [values, setValues] = useState({
    question: "",
    description: "",
    answer: "",
  });

  const handelInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handelInputUpdate = (event) => {
    const { name, value } = event.target;
    setFaqsUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}admin/add/faqs`,
        {
          question: values.question,
          answer: values.answer,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        setModalShow(false);
        NotificationManager.success("FAQs", response.data.message, 1500);
        getFaqs();
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
        `${process.env.REACT_APP_BASE_URL}admin/faqs/${faqsUpdate.id}`,
        faqsUpdate,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        setUpdateModal(false);
        NotificationManager.success("FAQs", response.data.message, 1500);
        getFaqs();
      } else {
        NotificationManager.error("Error", response.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };

  const deleteFaqs = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}admin/faqs/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        getFaqs();
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

  const getFaqs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/faqs`,
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
    getFaqs();
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
                    <h4>FAQs</h4>
                  </Col>
                  <Col md={1}>
                    <Button
                      title="add FAQs"
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
                        <th>Qeustion</th>
                        <th>Answer</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.question}</td>
                          <td>{item.answer}</td>
                          <td>
                            <Button
                              title="Edit"
                              className="m-1"
                              variant="warning"
                              size="sm"
                              onClick={() => updateFaqs(item)}
                            >
                              <FaPencilAlt color="white" />
                            </Button>
                            <Button
                              title="Delete"
                              variant="danger"
                              className="m-1"
                              size="sm"
                              onClick={() => deleteFaqs(item.id)}
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
        {/* Add FAQs model */}
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h3 className="zip-header">Add FAQs</h3>
            <Form onSubmit={handelSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Qeustion</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="question"
                  placeholder="Enter Question"
                  className="shadow-none"
                  onChange={handelInput}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  name="answer"
                  placeholder="Enter Answer"
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
        {/* end add FAQs modal */}
        {/* update FAQs modal */}
        <Modal
          size="lg"
          show={updateModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h3 className="zip-header">Update FAQs</h3>
            <Form onSubmit={handelUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="question"
                  placeholder="Enter Question"
                  className="shadow-none"
                  onChange={handelInputUpdate}
                  value={faqsUpdate.question}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  name="answer"
                  placeholder="Enter Answer"
                  className="shadow-none"
                  onChange={handelInputUpdate}
                  value={faqsUpdate.answer}
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

export default FAQs;
