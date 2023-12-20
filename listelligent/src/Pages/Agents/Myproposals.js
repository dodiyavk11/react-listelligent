import React, { useState, useEffect } from 'react';
import Agentlayout from '../../components/Agent/Agentlayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../Style/Agents/agentproposal.css';
import Button from 'react-bootstrap/Button';
import { GoArrowRight } from "react-icons/go";
import { TiMessages } from "react-icons/ti";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosResize } from "react-icons/io";
import { LuBath } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { PiPiggyBank } from "react-icons/pi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuClock10 } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


// Header-Tabs
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Myproposals = () => {

    // Header-Tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [tabvalue, tabsetValue] = React.useState(0);

    const tabhandleChange = (event, newValue) => {
        tabsetValue(newValue);
    };


    // Proposal-list-pagination and data
    const cardsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const data = [
        { name: 'Cassandra Szaras', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'John Heiler', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Rachel Lannin', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Dalton Hacker', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Svetlana Pritsker', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Bruce, Michelle Enigenburg', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Lucina Firman', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Bernadette Harvey', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Steve Wallace', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Christina Franken', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'David', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Frank', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Dorothy', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Josue', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Brian', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
        { name: 'Daniel', address: '6534 Persa St, Carlsbad, CA 92009', date: '11/28/2023' },
    ];


    const [modalShow, setModalShow] = React.useState(false);

    const renderCards_list = () => {
        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return data.slice(startIndex, endIndex).map((card, index) => (
            <div className='proposal-list-card' key={index} onClick={() => { setModalShow(true); cardClick(card); }}>
                <p><span className='status-tag'>Submited</span></p>
                <h3>{card.name}</h3>
                <p className='address'>{card.address}</p>
                <p className='submited-date'>Submitted on {card.date}</p>
            </div>
        ));
    };

    const nextPage = () => {
        if ((currentPage + 1) * cardsPerPage < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };
    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };


    const [sellerSelectedCard, setSellerSelectedCard] = useState(null);
    const cardClick = (card) => {
        setSellerSelectedCard(card);
    };
    const sellerSelectedCardDetails = () => {
        if (sellerSelectedCard) {
            return (
                <div className='proposal-list-content'>

                    <div className='client-details'>
                        <div className='client-details-heading'>
                            <h3>{sellerSelectedCard.name}</h3>
                        </div>
                        <div className='client-details-btn'>
                            <Button>Archive</Button>
                        </div>
                    </div>


                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='client-detail-tab-contant'>
                            <Tabs value={tabvalue} onChange={tabhandleChange} variant="scrollable" aria-label="basic tabs example">
                                <Tab className='activityFeed-tab' label="Activity Feed" {...a11yProps(0)} />
                                <Tab className='ProposalOver-tab' label="Proposal Overview" {...a11yProps(1)} />
                                <Tab className='PropertyInfo-tab' label="Property Info" {...a11yProps(2)} />
                                <Tab className='Documents-tab' label="Documents" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={tabvalue} index={0} className="p-3">
                            <div className=''>
                                <Container>
                                    <Row>
                                        <Col md={12}>
                                            <div className='client-filters'>
                                                <div className='client-filters-tabs'>
                                                    <span>Filter:</span>
                                                    <Button>All</Button>
                                                    <Button>Clients Activities</Button>
                                                    <Button>My Notes & Updates</Button>
                                                    <Button>Advisor</Button>
                                                </div>
                                                <div className='mobile-client-filters-tabs'>
                                                    <Form>
                                                        <Form.Group className="mb-3 d-flex align-items-center">
                                                            <Form.Label>Filter:</Form.Label>
                                                            <Form.Select aria-label="Default select example">
                                                                <option value="1">All</option>
                                                                <option value="2">Clients Activities</option>
                                                                <option value="3">My Notes & Updates</option>
                                                                <option value="4">Advisor</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Form>
                                                </div>
                                                <div className='client-filters-btn'>
                                                    <Button>Add Note</Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabvalue} index={1} className="p-3">
                            <div className='commissions'>
                                <Container>
                                    <div className='commission'>
                                        <Row className='align-items-center'>
                                            <Col md={3}>
                                                <h3>1.50%</h3>
                                                <p>Listing Commission</p>
                                            </Col>
                                            <Col md={3}>
                                                <h3>2.00%</h3>
                                                <p>Buyside Commission</p>
                                            </Col>
                                            <Col md={3}>
                                                <h3>3.50%</h3>
                                                <p>Total Commission</p>
                                            </Col>
                                            <Col md={3}>
                                                <Button>View Full Proposal</Button>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className='services'>
                                        <h3><TiMessages />Services</h3>
                                        <Row>
                                            <Col md={6}>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Professional Photos</span></div>
                                                    <div><span>Free</span></div>
                                                </div>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Home Staging</span></div>
                                                    <div><span>Extra $</span></div>
                                                </div>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Dedicated Website</span></div>
                                                    <div><span>Free</span></div>
                                                </div>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Postcard and Flyers</span></div>
                                                    <div><span>Free</span></div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Video Tour</span></div>
                                                    <div><span>Free</span></div>
                                                </div>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Landscaping</span></div>
                                                    <div><span>Extra $</span></div>
                                                </div>
                                                <div className='services-option d-flex justify-content-between'>
                                                    <div><span>Realtor.com</span></div>
                                                    <div><span>Free</span></div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabvalue} index={2} className="p-3">
                            <div className='property-info'>
                                <Container>
                                    <Row>
                                        <h1>6534 Persa St, Carlsbad, CA 92009</h1>
                                        <Col md={6}>
                                            <h4>$1.65M - $1.79M</h4>
                                            <span>UpNest Estimate</span>

                                            <div className='property-info-menu'>
                                                <IoHomeOutline /><span>Single Family</span>
                                            </div>
                                            <div className='property-info-menu'>
                                                <IoIosResize /><span>2432 sqft</span>
                                            </div>
                                            <div className='property-info-menu'>
                                                <LuBath /><span>2 Baths</span>
                                            </div>
                                            <div className='property-info-menu'>
                                                <LiaBedSolid /><span>4 Beds</span>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='property-info-box'>
                                                <h5>Showcase your high end home experience!</h5>
                                                <p>Sellers are ready to prepare their property for the market. They would like to get professional advice on market trends and pricing. They are looking for an agent who can sell quickly for the highest net profit! Adding a video greeting is a HUGE plus!</p>
                                            </div>
                                            <div className='mt-3 admin-name'><p><b>Johana Orozco</b> • UpNest Advisor</p></div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabvalue} index={3} className="p-3">
                            <div className='property-doc'>
                                <MdOutlineDocumentScanner /><span>Listing Agreement</span>
                                <div className='listing-input'>
                                    <div class="file-input">
                                        <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                        <label class="file-input__label" for="file-input">
                                            <MdOutlineFileUpload /><span>Upload file</span>
                                        </label>
                                    </div>
                                    <p>Max file size: 10 MB</p>
                                </div>
                            </div>

                            <div className='property-doc'>
                                <IoNewspaperOutline /><span>Closing Document</span>
                                <div className='listing-input'>
                                    <div class="file-input">
                                        <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                        <label class="file-input__label" for="file-input">
                                            <MdOutlineFileUpload /><span>Upload file</span>
                                        </label>
                                    </div>
                                    <p>Max file size: 10 MB</p>
                                </div>
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>
            );
        }
        return null;
    };



    // Popup-Box
    function MobilePopupBox(props) {

        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const checkIsMobile = () => {
                setIsMobile(window.innerWidth <= 767);
            };

            checkIsMobile();
            window.addEventListener('resize', checkIsMobile);

            return () => {
                window.removeEventListener('resize', checkIsMobile);
            };
        }, []);

        if (!isMobile) {
            return null;
        }

        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered style={{ maxWidth: '100%', width: '100%', margin: 0 }}>
                <Modal.Body closeButton>
                    {sellerSelectedCardDetails()}
                </Modal.Body>
            </Modal>
        );
    }


    return (
        <Agentlayout>
            <div className='my-proposal-header'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="proposel-header">
                        <Container>
                            <Row>
                                <Col>
                                    <Tabs className='proposal-header-tabs align-items-center' variant="scrollable" value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab className='seller-tab' label="SELLERS" {...a11yProps(0)} />
                                        <Tab className='buyer-tab' label="BUYERS" {...a11yProps(1)} />
                                        <Tab className='seller-archive-tab' label="SELLERS ARCHIVE" {...a11yProps(2)} />
                                        <Tab className='buyer-archive-tab' label="BUYERS ARCHIVE" {...a11yProps(3)} />
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </Box>
                    <Container>
                        <Row>
                            <Col>
                                <CustomTabPanel value={value} index={0}>
                                    <div>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <div className='myseller-proposal-tem'>
                                                        <div className='myseller-proposal-tem-content'>
                                                            <span>Seller Proposal Template</span>
                                                            <span className='myproposal-tem-status'>IMMEDIATE PROPOSAL ON</span>
                                                            <p>
                                                                <span>Proposal Score</span>
                                                                <span>88/100</span>
                                                            </p>
                                                        </div>
                                                        <div className='myseller-proposal-tem-btn'>
                                                            <Button>Edit Template<GoArrowRight /></Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>


                                    <div className='filters-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3}>
                                                    <div className='urgent-filters'>
                                                        <span>Urgency</span>
                                                        <Button>Urgent</Button>
                                                        <Button>Important</Button>
                                                    </div>
                                                </Col>
                                                <Col md={9}>
                                                    <div className='status-filters'>
                                                        <span>Status</span>
                                                        <Button>Pending</Button>
                                                        <Button>Submitted</Button>
                                                        <Button>Interviewing</Button>
                                                        <Button>Won</Button>
                                                        <Button>Listed</Button>
                                                        <Button>In Contract</Button>
                                                        <Button>Sold</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>

                                    <div className='mobile-view-containt'>
                                        <Container>
                                            <Row>
                                                <div className='mobile-urgency-filter'>
                                                    <Form>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Urgency</Form.Label>
                                                            <Form.Select aria-label="Default select example">
                                                                <option>All</option>
                                                                <option value="1">Urgent</option>
                                                                <option value="2">Important</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Form>
                                                </div>
                                                <div className='mobile-status-filters'>
                                                    <Form>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Status</Form.Label>
                                                            <Form.Select aria-label="Default select example">
                                                                <option>All</option>
                                                                <option value="1">Pending</option>
                                                                <option value="2">Submitted</option>
                                                                <option value="1">Interviewing</option>
                                                                <option value="2">Won</option>
                                                                <option value="1">Listed</option>
                                                                <option value="2">In Contract</option>
                                                                <option value="1">Sold</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Form>
                                                </div>
                                            </Row>
                                        </Container>
                                    </div>


                                    <div className='main-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3} className='p-0'>
                                                    <div className='overflow-auto' style={{ height: "800px" }}>
                                                        <div className='proposal-list-container'>
                                                            {renderCards_list()}
                                                            <MobilePopupBox show={modalShow} onHide={() => setModalShow(false)} />
                                                        </div>
                                                        <div id="pagination-controls">
                                                            <button className='pagination-prev' onClick={previousPage} disabled={currentPage === 0}>Previous</button>
                                                            <button className='pagination-next' onClick={nextPage} disabled={(currentPage + 1) * cardsPerPage >= data.length}>Next</button>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={9} className='p-0'>
                                                    {sellerSelectedCardDetails()}
                                                    {/* <div className='proposal-list-content'>

                                                        <div className='client-details'>
                                                            <div className='client-details-heading'>
                                                                <h3>Cassandra Szaras</h3>
                                                            </div>
                                                            <div className='client-details-btn'>
                                                                <Button>Archive</Button>
                                                            </div>
                                                        </div>


                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='client-detail-tab-contant'>
                                                                <Tabs value={tabvalue} onChange={tabhandleChange} aria-label="basic tabs example">
                                                                    <Tab className='activityFeed-tab' label="Activity Feed" {...a11yProps(0)} />
                                                                    <Tab className='ProposalOver-tab' label="Proposal Overview" {...a11yProps(1)} />
                                                                    <Tab className='PropertyInfo-tab' label="Property Info" {...a11yProps(2)} />
                                                                    <Tab className='Documents-tab' label="Documents" {...a11yProps(3)} />
                                                                </Tabs>
                                                            </Box>
                                                            <CustomTabPanel value={tabvalue} index={0} className="p-3">
                                                                <div className=''>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md={12}>
                                                                                <div className='client-filters'>
                                                                                    <div className='client-filters-tabs'>
                                                                                        <span>Filter:</span>
                                                                                        <Button>All</Button>
                                                                                        <Button>Clients Activities</Button>
                                                                                        <Button>My Notes & Updates</Button>
                                                                                        <Button>Advisor</Button>
                                                                                    </div>
                                                                                    <div className='client-filters-btn'>
                                                                                        <Button>Add Note</Button>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={1} className="p-3">
                                                                <div className='commissions'>
                                                                    <Container>
                                                                        <div className='commission'>
                                                                            <Row className='align-items-center'>
                                                                                <Col md={3}>
                                                                                    <h3>1.50%</h3>
                                                                                    <p>Listing Commission</p>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                    <h3>2.00%</h3>
                                                                                    <p>Buyside Commission</p>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                    <h3>3.50%</h3>
                                                                                    <p>Total Commission</p>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                    <Button>View Full Proposal</Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>

                                                                        <div className='services'>
                                                                            <h3><TiMessages />Services</h3>
                                                                            <Row>
                                                                                <Col md={6}>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Professional Photos</span></div>
                                                                                        <div><span>Free</span></div>
                                                                                    </div>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Home Staging</span></div>
                                                                                        <div><span>Extra $</span></div>
                                                                                    </div>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Dedicated Website</span></div>
                                                                                        <div><span>Free</span></div>
                                                                                    </div>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Postcard and Flyers</span></div>
                                                                                        <div><span>Free</span></div>
                                                                                    </div>
                                                                                </Col>
                                                                                <Col md={6}>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Video Tour</span></div>
                                                                                        <div><span>Free</span></div>
                                                                                    </div>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Landscaping</span></div>
                                                                                        <div><span>Extra $</span></div>
                                                                                    </div>
                                                                                    <div className='services-option d-flex justify-content-between'>
                                                                                        <div><span>Realtor.com</span></div>
                                                                                        <div><span>Free</span></div>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={2} className="p-3">
                                                                <div className='property-info'>
                                                                    <Container>
                                                                        <Row>
                                                                            <h1>6534 Persa St, Carlsbad, CA 92009</h1>
                                                                            <Col md={6}>
                                                                                <h4>$1.65M - $1.79M</h4>
                                                                                <span>UpNest Estimate</span>

                                                                                <div className='property-info-menu'>
                                                                                    <IoHomeOutline /><span>Single Family</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <IoIosResize /><span>2432 sqft</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <LuBath /><span>2 Baths</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <LiaBedSolid /><span>4 Beds</span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md={6}>
                                                                                <div className='property-info-box'>
                                                                                    <h5>Showcase your high end home experience!</h5>
                                                                                    <p>Sellers are ready to prepare their property for the market. They would like to get professional advice on market trends and pricing. They are looking for an agent who can sell quickly for the highest net profit! Adding a video greeting is a HUGE plus!</p>
                                                                                </div>
                                                                                <div className='mt-3 admin-name'><p><b>Johana Orozco</b> • UpNest Advisor</p></div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={3} className="p-3">
                                                                <div className='property-doc'>
                                                                    <MdOutlineDocumentScanner /><span>Listing Agreement</span>
                                                                    <div className='listing-input'>
                                                                        <div class="file-input">
                                                                            <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                                                            <label class="file-input__label" for="file-input">
                                                                                <MdOutlineFileUpload /><span>Upload file</span>
                                                                            </label>
                                                                        </div>
                                                                        <p>Max file size: 10 MB</p>
                                                                    </div>
                                                                </div>

                                                                <div className='property-doc'>
                                                                    <IoNewspaperOutline /><span>Closing Document</span>
                                                                    <div className='listing-input'>
                                                                        <div class="file-input">
                                                                            <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                                                            <label class="file-input__label" for="file-input">
                                                                                <MdOutlineFileUpload /><span>Upload file</span>
                                                                            </label>
                                                                        </div>
                                                                        <p>Max file size: 10 MB</p>
                                                                    </div>
                                                                </div>
                                                            </CustomTabPanel>
                                                        </Box>
                                                    </div> */}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={1}>
                                    <div>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <div className='myseller-proposal-tem'>
                                                        <div className='myseller-proposal-tem-content'>
                                                            <span>Buyer Proposal Template</span>
                                                            <span className='myproposal-tem-status'>IMMEDIATE PROPOSAL ON</span>
                                                        </div>
                                                        <div className='myseller-proposal-tem-btn'>
                                                            <Button>Edit Template<GoArrowRight /></Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>


                                    <div className='filters-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3}>
                                                    <div className='urgent-filters'>
                                                        <span>Urgency</span>
                                                        <Button>Urgent</Button>
                                                        <Button>Important</Button>
                                                    </div>
                                                </Col>
                                                <Col md={9}>
                                                    <div className='status-filters'>
                                                        <span>Status</span>
                                                        <Button>Pending</Button>
                                                        <Button>Submitted</Button>
                                                        <Button>Interviewing</Button>
                                                        <Button>Won</Button>
                                                        <Button>Listed</Button>
                                                        <Button>In Contract</Button>
                                                        <Button>Sold</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>


                                    <div className='main-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3} className='p-0'>
                                                    <div className='overflow-auto' style={{ height: "800px" }}>
                                                        <div className='proposal-list-container'>
                                                            {renderCards_list()}
                                                            <MobilePopupBox show={modalShow} onHide={() => setModalShow(false)} />
                                                        </div>
                                                        <div id="pagination-controls">
                                                            <button className='pagination-prev' onClick={previousPage} disabled={currentPage === 0}>Previous</button>
                                                            <button className='pagination-next' onClick={nextPage} disabled={(currentPage + 1) * cardsPerPage >= data.length}>Next</button>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={9} className='p-0'>
                                                    {sellerSelectedCardDetails()}
                                                    {/* <div className='proposal-list-content'>

                                                        <div className='client-details'>
                                                            <div className='client-details-heading'>
                                                                <h3>Cassandra Szaras</h3>
                                                                <div className='mt-4 d-flex align-items-center'><span><FiPhoneOutgoing />(858) 768-1623</span><br></br><span><MdOutlineMailOutline />jeaniemoua@gmail.com</span></div>
                                                            </div>
                                                            <div className='client-details-btn'>
                                                                <Button>Archive</Button>
                                                            </div>
                                                        </div>


                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='client-detail-tab-contant'>
                                                                <Tabs value={tabvalue} onChange={tabhandleChange} aria-label="basic tabs example">
                                                                    <Tab className='activityFeed-tab' label="Activity Feed" {...a11yProps(0)} />
                                                                    <Tab className='PropertyInfo-tab' label="Property Info" {...a11yProps(1)} />
                                                                    <Tab className='Documents-tab' label="Documents" {...a11yProps(2)} />
                                                                </Tabs>
                                                            </Box>
                                                            <CustomTabPanel value={tabvalue} index={0} className="p-3">
                                                                <div className=''>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md={12}>
                                                                                <div className='client-filters'>
                                                                                    <div className='client-filters-tabs'>
                                                                                        <span>Filter:</span>
                                                                                        <Button>All</Button>
                                                                                        <Button>Clients Activities</Button>
                                                                                        <Button>My Notes & Updates</Button>
                                                                                        <Button>Advisor</Button>
                                                                                    </div>
                                                                                    <div className='client-filters-btn'>
                                                                                        <Button>Add Note</Button>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={1} className="p-3">
                                                                <div className='property-info'>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md={6}>
                                                                                <h4>$701K - $900K</h4>
                                                                                <span>Buyer Estimate</span>

                                                                                <div className='property-info-menu'>
                                                                                    <IoLocationOutline /><span>San Diego, CA</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <PiPiggyBank /><span>Unknown</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <IoSpeedometerOutline /><span>Credit Score: Excellent</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <LuClock10 /><span>Just Started Looking</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <SlCalender /><span>N/A</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <IoHomeOutline /><span>Single Family</span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md={6}>
                                                                                <div className='property-info-box'>
                                                                                    <h5>Buyer is looking for a Single Family - $701K - $900K</h5>
                                                                                    <p>A buyer in San Diego, CA looking to purchase a Single Family in the $701K - $900K range. They just started looking. They may be open to signing an exclusive agreement with the right agent. Please submit your MOST competitive rebate!</p>
                                                                                </div>
                                                                                <div className='mt-3 admin-name'><p><b>Paula Allen</b> • UpNest Advisor</p></div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={2} className="p-3">
                                                                <div className='property-doc'>
                                                                    <MdOutlineDocumentScanner /><span>Listing Agreement</span>
                                                                    <div className='listing-input'>
                                                                        <div class="file-input">
                                                                            <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                                                            <label class="file-input__label" for="file-input">
                                                                                <MdOutlineFileUpload /><span>Upload file</span>
                                                                            </label>
                                                                        </div>
                                                                        <p>Max file size: 10 MB</p>
                                                                    </div>
                                                                </div>

                                                                <div className='property-doc'>
                                                                    <IoNewspaperOutline /><span>Closing Document</span>
                                                                    <div className='listing-input'>
                                                                        <div class="file-input">
                                                                            <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                                                            <label class="file-input__label" for="file-input">
                                                                                <MdOutlineFileUpload /><span>Upload file</span>
                                                                            </label>
                                                                        </div>
                                                                        <p>Max file size: 10 MB</p>
                                                                    </div>
                                                                </div>
                                                            </CustomTabPanel>
                                                        </Box>
                                                    </div> */}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={2}>

                                    <div className='filters-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3}>
                                                    <div className='urgent-filters'>
                                                        <span>Urgency</span>
                                                        <Button>Urgent</Button>
                                                        <Button>Important</Button>
                                                    </div>
                                                </Col>
                                                <Col md={9}>
                                                    <div className='status-filters'>
                                                        <span>Status</span>
                                                        <Button>Pending</Button>
                                                        <Button>Submitted</Button>
                                                        <Button>Interviewing</Button>
                                                        <Button>Won</Button>
                                                        <Button>Listed</Button>
                                                        <Button>In Contract</Button>
                                                        <Button>Sold</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>


                                    <div className='main-container'>
                                        <Container>
                                            <Row>
                                                <Col md={12} className='pt-3 text-center'>
                                                    <p>No Result</p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={3}>

                                    <div className='filters-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3}>
                                                    <div className='urgent-filters'>
                                                        <span>Urgency</span>
                                                        <Button>Urgent</Button>
                                                        <Button>Important</Button>
                                                    </div>
                                                </Col>
                                                <Col md={9}>
                                                    <div className='status-filters'>
                                                        <span>Status</span>
                                                        <Button>Pending</Button>
                                                        <Button>Submitted</Button>
                                                        <Button>Interviewing</Button>
                                                        <Button>Won</Button>
                                                        <Button>Listed</Button>
                                                        <Button>In Contract</Button>
                                                        <Button>Sold</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>


                                    <div className='main-container'>
                                        <Container>
                                            <Row>
                                                <Col md={3} className='p-0'>
                                                    <div className='overflow-auto' style={{ height: "800px" }}>
                                                        <div className='proposal-list-container'>
                                                            {renderCards_list()}
                                                            <MobilePopupBox show={modalShow} onHide={() => setModalShow(false)} />
                                                        </div>
                                                        <div id="pagination-controls">
                                                            <button className='pagination-prev' onClick={previousPage} disabled={currentPage === 0}>Previous</button>
                                                            <button className='pagination-next' onClick={nextPage} disabled={(currentPage + 1) * cardsPerPage >= data.length}>Next</button>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={9} className='p-0'>
                                                    {sellerSelectedCardDetails()}
                                                    {/* <div className='proposal-list-content'>

                                                        <div className='client-details'>
                                                            <div className='client-details-heading'>
                                                                <h3>Cassandra Szaras</h3>
                                                                <div className='mt-4 d-flex align-items-center'><span><FiPhoneOutgoing />(858) 768-1623</span><br></br><span><MdOutlineMailOutline />jeaniemoua@gmail.com</span></div>
                                                            </div>
                                                            <div className='client-details-btn'>
                                                                <Button>Unarchive</Button>
                                                            </div>
                                                        </div>


                                                        <Box sx={{ width: '100%' }}>
                                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='client-detail-tab-contant'>
                                                                <Tabs value={tabvalue} onChange={tabhandleChange} aria-label="basic tabs example">
                                                                    <Tab className='activityFeed-tab' label="Activity Feed" {...a11yProps(0)} />
                                                                    <Tab className='PropertyInfo-tab' label="Property Info" {...a11yProps(1)} />
                                                                    <Tab className='Documents-tab' label="Documents" {...a11yProps(2)} />
                                                                </Tabs>
                                                            </Box>
                                                            <CustomTabPanel value={tabvalue} index={0} className="p-3">
                                                                <div className=''>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md={12}>
                                                                                <div className='client-filters'>
                                                                                    <div className='client-filters-tabs'>
                                                                                        <span>Filter:</span>
                                                                                        <Button>All</Button>
                                                                                        <Button>Clients Activities</Button>
                                                                                        <Button>My Notes & Updates</Button>
                                                                                        <Button>Advisor</Button>
                                                                                    </div>
                                                                                    <div className='client-filters-btn'>
                                                                                        <Button>Add Note</Button>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={1} className="p-3">
                                                                <div className='property-info'>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col md={6}>
                                                                                <h4>$1M - $1.4M</h4>
                                                                                <span>Buyer Estimate</span>

                                                                                <div className='property-info-menu'>
                                                                                    <IoLocationOutline /><span>12049 Tretagnier Circle, San Diego, CA, 92128, Carlsbad, CA</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <PiPiggyBank /><span>Unknown</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <IoSpeedometerOutline /><span>Credit Score: Excellent</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <LuClock10 /><span>Just Started Looking</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <SlCalender /><span>N/A</span>
                                                                                </div>
                                                                                <div className='property-info-menu'>
                                                                                    <IoHomeOutline /><span>Single Family</span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md={6}>
                                                                                <div className='property-info-box'>
                                                                                    <h5>Not pre-approved. Looking for a Single Family - with $1M - $1.4M Price Range</h5>
                                                                                    <p>Buyer in Carlsbad, CA looking to purchase a Single Family in the $1M - $1.4M range. They just started looking. May be open to signing an exclusive agreement with the right agent.Please submit your MOST competitive rebate! Voice proposal a HUGE plus!</p>
                                                                                </div>
                                                                                <div className='mt-3 admin-name'><p><b>Alicia O'Leary</b> • UpNest Advisor</p></div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </CustomTabPanel>
                                                            <CustomTabPanel value={tabvalue} index={2} className="p-3">
                                                                <div className='property-doc'>
                                                                    <MdOutlineDocumentScanner /><span>Listing Agreement</span>
                                                                    <div className='listing-input'>
                                                                        <div class="file-input">
                                                                            <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                                                            <label class="file-input__label" for="file-input">
                                                                                <MdOutlineFileUpload /><span>Upload file</span>
                                                                            </label>
                                                                        </div>
                                                                        <p>Max file size: 10 MB</p>
                                                                    </div>
                                                                </div>

                                                                <div className='property-doc'>
                                                                    <IoNewspaperOutline /><span>Closing Document</span>
                                                                    <div className='listing-input'>
                                                                        <div class="file-input">
                                                                            <input type="file" name="file-input" id="file-input" class="file-input__input" />
                                                                            <label class="file-input__label" for="file-input">
                                                                                <MdOutlineFileUpload /><span>Upload file</span>
                                                                            </label>
                                                                        </div>
                                                                        <p>Max file size: 10 MB</p>
                                                                    </div>
                                                                </div>
                                                            </CustomTabPanel>
                                                        </Box>
                                                    </div> */}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </CustomTabPanel>
                            </Col>
                        </Row>
                    </Container>
                </Box>
            </div>
        </Agentlayout>
    )
}

export default Myproposals;