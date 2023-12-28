import React, { useState, useEffect } from "react";
import "../../Style/home.css";
import Layout from "../../components/Layouts/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsGeoAltFill } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdContactless } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BsCart, BsTrash } from 'react-icons/bs'; 
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

  useEffect(() => {
    const fetchCartItems = async () => {
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
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}zipcode/search?q=${searchInput}`
      );

      setSearchResults(response.data.data);
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
    }
  };
  const handleAddToCart = async (id) => {
    try {
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
        NotificationManager.error("Error", error.response.data.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", error.response.data.message, 3000);
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
  const cartTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.zipCode.prize),
    0
  );

  const formattedTotal = cartTotal.toFixed(2);
  return (
    <Layout>
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
              {searchResults.map((result, index) => (
                <Row key={result.id} className="p-1">
                  <Col md={2}></Col>
                  <Col md={9}>
                    <Row>
                      <Col md={3}>
                        <p>{result.city}</p>
                      </Col>
                      <Col md={3}>
                        <p>{result.prize}</p>
                      </Col>
                      <Col md={4}>
                        <p>{result.zip_code}</p>
                      </Col>
                      <Col md={2}>
                        <Button
                          className="find-btn"
                          onClick={() => handleAddToCart(result.id)}
                        >
                          <BsCart/>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </div>
          )}

          {/* {cartItems.length > 0 && (
            <div className="cartItem mb-5">
              <hr />
              <Row>
                <Col md={12}>
                  <h3>Your cart item</h3>
                </Col>
              </Row>
              {cartItems.map((result, index) => (
                <Row key={result.id} className="p-2">
                  <Col md={8}>
                    <Row>
                      <Col md={3}>
                        <p>{result.zipCode.city}</p>
                      </Col>
                      <Col md={3}>
                        <p>{result.zipCode.zip_code}</p>
                      </Col>
                      <Col md={4}>
                        <p>{result.zipCode.prize}</p>
                      </Col>
                      <Col md={2}>
                        <Button
                          className="find-btn"
                          onClick={() => handleRemoveItem(result.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2}></Col>
                </Row>
              ))}
            </div>
          )} */}

          {cartItems.length > 0 && (
            <div className="cartItem mb-5">
              <hr />
              <Row>
                <Col md={8}>
                  <h3>Your cart items</h3>
                  <hr />
                  {cartItems.map((result, index) => (
                    <Row key={result.id} className="p-2">
                      <Row key={result.id} className="p-2">
                        <Col md={12}>
                          <Row>
                            <Col md={3}>
                              <p>{result.zipCode.city}</p>
                            </Col>
                            <Col md={3}>
                              <p>{result.zipCode.zip_code}</p>
                            </Col>
                            <Col md={3}>
                              <p>{result.zipCode.prize}</p>
                            </Col>
                            <Col md={3}>
                              <Button
                                className="find-btn"
                                onClick={() => handleRemoveItem(result.id)}
                              >
                                <BsTrash/>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                  ))}
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
                  <Button className="find-btn">
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
