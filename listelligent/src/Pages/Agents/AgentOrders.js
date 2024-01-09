import React, { useState, useEffect } from "react";
import Agentlayout from "../../components/Agent/Agentlayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../Style/custom.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import TimeAgo from "react-timeago";

const AgentOrders = () => {
  const navigate = useNavigate();
  const [ordersList, setOrderlist] = useState([]);
  const authToken = localStorage.getItem("token");

  const handleDownloadClick = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/generateInvoice/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.status) {
        const link = document.createElement("a");
        link.href = `${process.env.REACT_APP_BASE_URL}${response.data.filepath}`;
        link.download = `invoice_${id}.pdf`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}agent/orders`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        if (response.status) {
          setOrderlist(response.data.data);
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

    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState("1");
  const handleLiClick = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <Agentlayout>
      <div className="account-header-container">
        <Container>
          <NotificationContainer />
          <Row>
            <Col>
              <div className="account-header">
                <div className="d-flex justify-content-between">
                  <Button className="buymoreBtn">
                    <FiArrowLeft className="text-white"/>
                    <Link to={"/agentDashboard"}>Go back to Dashboard</Link>
                  </Button>
                  <Button className="buymoreBtn">
                    <Link to={"/agent/purchase-zip"}>Buy more</Link>
                  </Button>
                </div>
                <h1>Orders</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="account-forms m-2">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="account-content">
                {ordersList.length > 0 && (
                  <div>
                    {ordersList.map((result, index) => (
                      <Accordion defaultActiveKey={activeTab} key={index}>
                        <Accordion.Item
                          eventKey={index.toString()}
                          className="accordian-items"
                        >
                          <Accordion.Header>
                            <p>
                              Total amount : &nbsp;<b>{result.total}</b>
                              &nbsp;&nbsp;
                            </p>
                            <span className="status-tag mb-3">
                              {" "}
                              <TimeAgo date={result.created_at} />
                            </span>
                            &nbsp;
                            <span
                              className="status-tag mb-3"
                              title="Download invoice"
                              onClick={() => handleDownloadClick(result.id)}
                            >
                              <FiDownload size={20} />
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="imp-doc-accordian">
                              {result.orderProduct.length > 0 && (
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
                                  {result.orderProduct.map((result, index) => (
                                    <Row
                                      className="pb-3 border-bottom align-items-center"
                                      key={index}
                                    >
                                      <Col lg={3} className="imp-doc-first-col">
                                        <p>{result.city}</p>
                                      </Col>
                                      <Col
                                        lg={3}
                                        className="imp-doc-second-col"
                                      >
                                        <p>{result.zip_code}</p>
                                      </Col>
                                      <Col lg={3} className="imp-doc-third-col">
                                        <p>{result.price}</p>
                                      </Col>
                                      <Col lg={3} className="imp-doc-third-col">
                                        <p>
                                          {result.start_date} -{" "}
                                          {result.end_date}
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
                    ))}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Agentlayout>
  );
};

export default AgentOrders;
