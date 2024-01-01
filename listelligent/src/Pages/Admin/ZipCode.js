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
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function Validation(values) {
  let error = {};

  if (values.zip === "") {
    error.zip = "Zip should not be empty";
  } else {
    error.zip = "";
  }

  if (values.prize === "") {
    error.prize = "Prize should not be empty";
  } else {
    error.prize = "";
  }

  if (values.status === "") {
    error.status = "Status should not be empty";
  } else {
    error.status = "";
  }

  return error;
}

const ZipCode = () => {
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);

  // UpdateZip Function Start
  const updateZip = (row) => {
    const zipid = row.id;
    const zipcode = row.zip_code;
    const zipprize = row.prize;
    const zipstatus = row.status;
    setModalShow(true);

    console.log(
      "id:- " +
        zipid +
        "/" +
        "zip_code:- " +
        zipcode +
        "/" +
        "zipprize:- " +
        zipprize +
        "/" +
        "zipstatus:- " +
        zipstatus
    );
  };
  // UpdateZip Function Start

  function ZipCodeModel(props) {
    const [values, setValues] = useState({
      zip: "",
      prize: "",
      status: "",
    });

    const [errors, setErrors] = useState({});
    const handelInput = (event) => {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: [event.target.value],
      }));
    };

    const handelSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values));

      if (errors.zip === "" && errors.prize === "" && errors.status === "") {
        axios
          .post("http://localhost:3001/submitzip", values)
          .then((res) => {
            if (res.data.Status === "Success") {
              setModalShow(false);
              axios
                .get("http://localhost:3001/viewzip")
                .then((res) => {
                  setData(res.data);
                  setRecords(res.data);
                })
                .catch((err) => console.log(err));
            }
          })
          .then((err) => console.log(err));
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                placeholder="Enter Zip-Code"
                className="shadow-none"
                onChange={handelInput}
              />
              {errors.zip && <span className="text-danger">{errors.zip}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prize</Form.Label>
              <Form.Control
                type="text"
                name="prize"
                placeholder="Enter Prize"
                className="shadow-none"
                onChange={handelInput}
              />
              {errors.prize && (
                <span className="text-danger">{errors.prize}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                placeholder="Set Status"
                className="shadow-none"
                onChange={handelInput}
              />
              {errors.status && (
                <span className="text-danger">{errors.status}</span>
              )}
            </Form.Group>

            <div className="zip-submit-btn d-flex justify-content-end">
              <Button onClick={handelSubmit}>Submit</Button>
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
      name: "Zip-Code",
      selector: (row) => row.zip_code,
      sortable: true,
    },
    {
      name: "Prize",
      selector: (row) => row.prize,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
            Update
          </Button>
          <Button
            variant="danger"
            className="m-1"
            size="sm"
            onClick={() => deleteZip(row.id)}
          >
            Delete
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
    const newData = data.filter((row) => {
      return row.zip_code
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
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

  return (
    <Dashboardlayout>
      <Container fluid>
        <NotificationContainer />
        <Row>
          <Col>
            <div className="zip-code-datatable">
              <div className="dataTableHeader">
                <h2>Zip-Code List</h2>
                <Form.Control
                  className="shadow-none"
                  type="text"
                  id="inputtext5"
                  placeholder="Search..."
                  onChange={handlefilter}
                />
                <Button variant="success" onClick={() => setModalShow(true)}>
                  Add Zip Code
                </Button>
                <ZipCodeModel
                  show={modalShow}
                  onHide={() => setModalShow(false)}
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
        </Row>
      </Container>
    </Dashboardlayout>
  );
};

export default ZipCode;
