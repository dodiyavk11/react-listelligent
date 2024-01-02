import React, { useState, useEffect } from "react";
import "../../Style/home.css";
import Layout from "../../components/Layouts/Layout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BsCart, BsTrash } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const PurchaseZip = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (searchInput.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const [fetchCartItems, setFetchCartItems] = useState(() => async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/getCart`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      setCartItems(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  });

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}zipcode/search?q=${searchInput}`
      );

      setSearchResults(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/zip/addtocart/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        setCartItems(response.data.data);
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

  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/item-remove/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        setCartItems(response.data.data);
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
  const handleConfirmBox = () => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to Place order ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handlePlaceOrder();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/cart/placeOrder`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );
      if (response.status) {
        NotificationManager.success("Success", response.data.message, 3000);
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.activeZipcode = cartItems.length;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/agentDashboard");
        // fetchCartItems();
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
  const cartTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.zipCode.prize),
    0
  );

  const formattedTotal = cartTotal.toFixed(2);
  return (
    <Layout>
      <div className="account-header-container">
        <Container>
          <NotificationContainer />
          <Row>
            <Col>
              <div className="account-header">
                <Button>
                  <Link to={"/agentDashboard"}>Go back to Dashboard</Link>
                </Button>
                <h1>Zip code</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="first-section">
        <Container>
          <NotificationContainer />
          <Row className="mt-3 mb-5 first-inner-section">
            <div className="zip-search-input">
              <InputGroup
                className="mt-3 zip-search-input-content"
                style={{ width: "100%" }}
              >
                <Form.Control
                  placeholder="Search zip code and add to cart"
                  aria-label="Zip code"
                  aria-describedby="basic-addon2"
                  className="shadow-none"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button className="find-btn">Search</Button>
              </InputGroup>
            </div>
          </Row>
          {searchResults.length > 0 && (
            <div className="cartItem mb-5">
              <Row>
                {searchResults.map((result, index) => (
                  <Col key={index} xs={2} md={2} lg={2}>
                    {/* Bootstrap Card for each product */}
                    <Card className="mb-4" key={index}>
                      <Card.Body className="text-center">
                        <Card.Title>{result.city}</Card.Title>
                        <Card.Text>
                          <b>${result.prize}</b>
                        </Card.Text>
                        <Card.Text>{result.zip_code}</Card.Text>
                        {result.isSold === 1 ? (
                          <Button
                            variant="warning"
                            className="text-white"
                            disabled
                          >
                            Sold
                          </Button>
                        ) : (
                          <Button
                            className="find-btn"
                            onClick={() => handleAddToCart(result.id)}
                          >
                            <BsCart />
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="cartItem mb-5">
              <hr />
              <Row>
                <Col md={8}>
                  <h3>Your cart items</h3>
                  <hr />
                  <Row>
                    {cartItems.map((result, index) => (                      
                      <Col md={3} key={index}>
                        <Card className="mb-4">
                          <Card.Body className="text-center">
                            <Card.Title>{result.zipCode.city}</Card.Title>
                            <Card.Text>
                              <b>${result.zipCode.prize}</b>
                            </Card.Text>
                            <Card.Text>{result.zipCode.zip_code}</Card.Text>
                            <Button
                              className="find-btn"
                              onClick={() => handleRemoveItem(result.id)}
                            >
                              <BsTrash />
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col md={4}>
                  <h3>Order summary</h3>
                  <hr />
                  <Form.Control
                    type="text"
                    name="promo_code"
                    placeholder="Enter promo code"
                    className="form-control shadow-none form-input mb-2"
                  />
                  <Button
                    className="find-btn"
                    onClick={() => handleConfirmBox()}
                  >
                    Order now <b>${formattedTotal}</b>
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default PurchaseZip;
