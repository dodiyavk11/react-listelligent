import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/Admin/Dashboardlayout";
import "../../Style/Admin/zipcode.css";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  FaPencilAlt,
  FaTrash,
  FaCloudUploadAlt,
  FaPlus,
  FaBan,
  FaCheck,
} from "react-icons/fa";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Card } from "react-bootstrap";
import "../../Style/custom.css";

const ZipCode = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [csvFile, setCsvFile] = useState(null);
  // UpdateZip Function Start
  const updateZip = (row) => {
    const zipid = row.id;
    const zipcode = row.zip_code;
    const zipprize = row.prize;
    const zipstatus = row.status;
    const zipcity = row.city;
    setModalShow(true);
  };
  // UpdateZip Function Start

  function ZipCodeModel(props) {
    const [values, setValues] = useState({
      zip: "",
      prize: "",
      status: "",
      city: "",
    });

    const handelInput = (event) => {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    };

    const handelSubmit = async (event) => {
      event.preventDefault();
      const authToken = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}admin/add/zipcode`,
          {
            city: values.city,
            zip: values.zip,
            prize: values.prize,
            status: values.status,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );
        if (response.status) {
          setModalShow(false);
          NotificationManager.success("Signup", response.data.message, 1500);
          getZipCodeData();
        } else {
          NotificationManager.error("Error", response.message, 3000);
        }
      } catch (error) {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h3 className="zip-header">Add Zip-Code</h3>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                required
                type="number"
                name="zip"
                placeholder="Enter Zip-Code"
                className="shadow-none"
                onChange={handelInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prize</Form.Label>
              <Form.Control
                required
                type="text"
                name="prize"
                placeholder="Enter Prize"
                className="shadow-none"
                onChange={handelInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                placeholder="Enter City"
                className="shadow-none"
                onChange={handelInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
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
            </Form.Group>

            <div className="zip-submit-btn d-flex justify-content-end">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  // DeleteZip Function Start
  const deleteZip = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}admin/zipcode/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        getZipCodeData();
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
  // DeleteZip Function End

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Zip code",
      selector: (row) => row.zip_code,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Prize",
      selector: (row) => row.prize,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) =>
        row.status === 1 ? (
          <Button variant="success" size="sm">
            <FaCheck />
          </Button>
        ) : (
          <Button variant="danger" size="sm">
            <FaBan />
          </Button>
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex justify-content-between">
          <Button
            className="m-1"
            variant="warning"
            size="sm"
            onClick={() => updateZip(row)}
          >
            <FaPencilAlt color="white" />
          </Button>
          <Button
            variant="danger"
            className="m-1"
            size="sm"
            onClick={() => deleteZip(row.id)}
          >
            <FaTrash />
          </Button>
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
    const searchQuery = event.target.value.toLowerCase();
  
    const newData = data.filter((row) => {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          const valueString = (typeof value === 'string' || typeof value === 'number') ? value.toString().toLowerCase() : '';
          if (valueString.includes(searchQuery)) {
            return true;
          }
        }
      }
      return false;
    });
  
    setRecords(newData);
  }
  const getZipCodeData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}admin/zipcode`,
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
    getZipCodeData();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  
    if (file) {
      try {
        const formData = new FormData();
        formData.append("csvFile", file);
  
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}admin/excelZipCode/add`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
  
        if (response.status) {
          NotificationManager.success("Success", response.data.message, 1500);
          getZipCodeData();
        } else {
          NotificationManager.error("Error", response.message, 3000);
        }
      } catch (error) {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  };

  return (
    <Dashboardlayout>
      <Container fluid>
        <NotificationContainer />
        <Row>
          <Col md={12}>
            <Card className="mt-4">
              <Card.Header>
                <h2>Zip codes</h2>
              </Card.Header>
              <Card.Body>
                <div className="datatable">
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
                    <div>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => setModalShow(true)}
                      >
                        <FaPlus />
                      </Button>
                      &nbsp;
                      <Button size="sm" variant="warning">
                        <label htmlFor="uploadFileInput">
                          <FaCloudUploadAlt />
                        </label>
                        <input
                          id="uploadFileInput"
                          type="file"
                          accept=".csv"
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(e)}
                        />
                      </Button>
                      <ZipCodeModel
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </div>
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
        </Row>
      </Container>
    </Dashboardlayout>
  );
};

export default ZipCode;
