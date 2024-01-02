import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import "../Style/agentprofile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { LuBedDouble } from "react-icons/lu";
import { LuBath } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import dummyAgent from "../assets/agreement.png";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <video
          src="https://video-cdn.ziggeo.com/v1/applications/e0601e02e994ce8d4763a3cff2190b09/videos/691b73e73d4c589acfd1870b1f2afad0/video.mp4"
          autoPlay
          controls
          style={{ width: "100%" }}
        ></video>
      </Modal.Body>
    </Modal>
  );
}

const Agentprofile = () => {
  const { id } = useParams();
  const [modalShow, setModalShow] = React.useState(false);
  const [agentData, setAgentData] = useState([]);
  useEffect(() => {
    getAgentData();
  }, []);

  const getAgentData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}agent/view/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status) {
        setAgentData(response.data.data);
      } else {
        NotificationManager.error("Error", response.data.message, 3000);
      }
    } catch (error) {
      NotificationManager.error("Error", "Something went to wrong", 3000);
    }
  };
  return (
    <Layout>
      <div className="profile-conteiner">
        <Container>
        <NotificationContainer />
          <Row>
            <Col md={8}>
              <Row className="d-flex align-items-center">
                <Col md={3}>
                  <div className="angent-img-icons">
                    <img src={dummyAgent}></img>
                    <div className="d-flex justify-content-center mt-3 social-icons">
                      <FaFacebook className="facebook" />
                      <FaLinkedin className="linkedin" />
                      <FaTwitter className="twitter" />
                      <FaYoutube className="youtube" />
                    </div>
                  </div>
                </Col>
                <Col md={9} className="profile-content">
                  <h2>{agentData.name}</h2>
                  <p>Four Season Reality</p>
                  <p>
                    <span>Agent License #</span>{agentData.license}
                  </p>
                  <p>
                    <span>Speaks</span>English
                  </p>
                  <p>
                    <span>12</span>Years of Experience
                  </p>
                  <p>
                    <span>Brokerage</span> {agentData.brokerage}
                  </p>
                  <p>
                    <span>${agentData.hp_sales_price}</span>Price
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <div className="video-content">
                <img src="https://video-cdn.ziggeo.com/v1/applications/e0601e02e994ce8d4763a3cff2190b09/videos/691b73e73d4c589acfd1870b1f2afad0/image"></img>
                <Link onClick={() => setModalShow(true)}>
                  <FaPlayCircle />
                </Link>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </Col>
          </Row>

          <Row className="profile-sub-img-content">
            <Col md={12}>
              <h4>Promotional Materials</h4>
              <Row className="profile-sub-img">
                <Col>
                  <img src="https://storage.googleapis.com/upnest1/upload/realtor/672158992_abd6408e-e3d6-4ce7-a7c4-4cf1df8b0497.jpeg"></img>
                </Col>
                <Col>
                  <img src="https://storage.googleapis.com/upnest1/upload/realtor/672158992_abd6408e-e3d6-4ce7-a7c4-4cf1df8b0497.jpeg"></img>
                </Col>
                <Col>
                  <img src="https://storage.googleapis.com/upnest1/upload/realtor/672158992_abd6408e-e3d6-4ce7-a7c4-4cf1df8b0497.jpeg"></img>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="agent-about-info">
        <Container>
          <Row>
            <Col md={12}>
              <div className="agent-about-info-heading">
                <h3>More About {agentData.name}</h3>
                <p>
                  <span>Specialties:</span> Fine/Luxury Homes, Relocation,
                  Waterfront Homes, Farm/Vineyard
                </p>
                <p>
                  <span>Certifications & Awards:</span> Broker, Professional
                  Staging Cuunsltant
                </p>
                <p>
                  <span>Client Endorsements:</span> Exeperienced, Friendly, Good
                  Negotiator, Honest, Knowledgeable, Responsive, Tech Savvy,
                  Well Connected
                </p>

                <p>
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the release of Letraset sheets
                  containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>

                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="slider">
        <Container>
          <Row>
            <Col md={12}>
              <div class="container-fluid">
                <h1>Featured Transactions</h1>
                <OwlCarousel
                  items={3}
                  className="owl-theme"
                  loop
                  nav
                  margin={8}
                  responsive={{
                    0: { items: 1 },
                    768: { items: 2 },
                    1224: { items: 3 },
                  }}
                >
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279583_880486ef-2021-46fb-a595-559c83272bb1.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Sold</p>
                  </div>
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279588_513b5826-e5a9-4ce1-9fd0-0efca3b158b0.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Sold</p>
                  </div>
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279585_4cbaa342-8d16-4eee-bfb7-0db320359147.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Bought</p>
                  </div>
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279581_698da2e1-bfeb-46c2-aac0-f4a099cee868.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Bought</p>
                  </div>
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279583_880486ef-2021-46fb-a595-559c83272bb1.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Sold</p>
                  </div>
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279588_513b5826-e5a9-4ce1-9fd0-0efca3b158b0.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Bought</p>
                  </div>
                  <div className="carousel-card">
                    <img
                      className="img"
                      src={
                        "https://storage.googleapis.com/upnest1/upload/transaction/279585_4cbaa342-8d16-4eee-bfb7-0db320359147.jpg"
                      }
                    />
                    <div className="carousel-card-content">
                      <h4>$1,530,000</h4>
                      <div className="sq-icon">
                        <span>
                          <LuBedDouble />5 Beds
                        </span>
                        <span>
                          <LuBath />5 Baths
                        </span>
                        <span>
                          <IoHomeOutline />
                          4356 Sq. Ft
                        </span>
                      </div>
                      <p>1620 Frazier Ave</p>
                      <p>Carlsbad, CA 92008</p>
                    </div>
                    <p className="tag">Sold</p>
                  </div>
                </OwlCarousel>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Agentprofile;
