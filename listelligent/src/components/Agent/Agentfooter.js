import React from "react";
import "../../Style/footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col md={9}>
            <h4>Listelligent</h4>
            <p>PO Box 12345</p>
            <p>San Diego, CA 92119</p>
          </Col>
          <Col md={3}>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Terms Of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col md={3}></Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
