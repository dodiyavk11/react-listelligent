import React from 'react';
import Agentlayout from '../../components/Agent/Agentlayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../Style/Agents/agentdashboard.css';
import { Link } from 'react-router-dom';
import { FaChalkboardUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaAngleDown } from "react-icons/fa6";
import { LuPhoneIncoming } from "react-icons/lu";
import { MdOutlineSettingsPhone } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import CircularProgress from '@mui/material/CircularProgress';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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


// Progress-bar-code
function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};



const Agentdashboard = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // Progress-bar-code
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <Agentlayout>
            <div className='proposal_search_form_container'>
                <Container>
                    <Row className='mb-3'>
                        <Col md={6}>
                            <div className='proposal_search_form'>
                                <span>Proposals</span>
                                <input type='text' placeholder='Search for a Name, Phone #, Email or Address'></input>
                                <button>Go</button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='filters-menu-container'>
                                <span className='filters-menu'>
                                    <FaChalkboardUser />
                                    <Link>All Sellers</Link>
                                </span>
                                <span className='filters-menu'>
                                    <MdOutlineShoppingCart />
                                    <Link>All Buyers</Link>
                                </span>
                                <span className='filters-menu'>
                                    <IoArchiveOutline />
                                    <Link>Archived</Link>
                                </span>
                                <span className='filters-menu'>
                                    <MdOutlineRemoveRedEye />
                                    <Link>Clients' Activities</Link>
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                </Container>
            </div>

            <div className='tab-containt'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Box sx={{ width: '100%' }}>
                                <Box>
                                    <Tabs className="dashboard-tabs" value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab className="seller-btn" label="SELLERS" {...a11yProps(0)} />
                                        <Tab className="buyer-btn" label="BUYERS" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>

                                <CustomTabPanel value={value} index={0}>
                                    <Container>
                                        <Row>
                                            <Col md={4}>
                                                <div className='seller-proposals'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='status-span'>Submited</span>
                                                        <span className='icon-span'><RiDeleteBin6Line /></span>
                                                    </div>
                                                    <h5>Dalton Hacker</h5>
                                                    <p>14283 Mariana Dr, Poway, CA 92064</p>
                                                    <p>Estimate $637K - $792K</p>
                                                    <p>Submitted on 10/09/2023 12:14 PM</p>
                                                    <div>
                                                        <Button className='leave-btn'>Leave Update</Button>
                                                        <Button className='view-proposal'>View Proposal</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='seller-proposals'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='status-span'>Submited</span>
                                                        <span className='icon-span'><RiDeleteBin6Line /></span>
                                                    </div>
                                                    <h5>Svetlana Pritsker</h5>
                                                    <p>9838 Apple Tree Dr, San Diego, CA 92124</p>
                                                    <p>Estimate $660K - $819K</p>
                                                    <p>Submitted on 10/03/2023 10:38 AM</p>
                                                    <div>
                                                        <Button className='leave-btn'>Leave Update</Button>
                                                        <Button className='view-proposal'>View Proposal</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='seller-proposals'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='status-span'>Submited</span>
                                                        <span className='icon-span'><RiDeleteBin6Line /></span>
                                                    </div>
                                                    <h5>Bruce, Michelle Enigenburg</h5>
                                                    <p>3444 Don Lorenzo Dr, Carlsbad, CA 92010</p>
                                                    <p>Estimate $501K - $800K</p>
                                                    <p>Submitted on 09/28/2023 12:39 PM</p>
                                                    <div>
                                                        <Button className='leave-btn'>Leave Update</Button>
                                                        <Button className='view-proposal'>View Proposal</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Button className='load-more-btn'>+ Load More</Button>
                                    </Container>
                                </CustomTabPanel>

                                {/* Buyers Tab */}
                                <CustomTabPanel value={value} index={1}>
                                    <Container>
                                        <Row>
                                            <Col md={4}>
                                                <div className='seller-proposals'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='status-span'>Submited</span>
                                                        <span className='icon-span'><RiDeleteBin6Line /></span>
                                                    </div>
                                                    <h5>Cassandra Szaras</h5>
                                                    <p>6534 Persa St, Carlsbad, CA 92009</p>
                                                    <p>Estimate $1.65M - $1.79M</p>
                                                    <p>Submitted on 11/28/2023 7:09 AM</p>
                                                    <div>
                                                        <Button className='leave-btn'>Leave Update</Button>
                                                        <Button className='view-proposal'>View Proposal</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='seller-proposals'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='status-span'>Submited</span>
                                                        <span className='icon-span'><RiDeleteBin6Line /></span>
                                                    </div>
                                                    <h5>John Heiler</h5>
                                                    <p>3042 Starry Night Dr, Escondido, CA 92029</p>
                                                    <p>Estimate $1M - $2M</p>
                                                    <p>Submitted on 11/04/2023 11:46 AM</p>
                                                    <div>
                                                        <Button className='leave-btn'>Leave Update</Button>
                                                        <Button className='view-proposal'>View Proposal</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='seller-proposals'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <span className='status-span'>Submited</span>
                                                        <span className='icon-span'><RiDeleteBin6Line /></span>
                                                    </div>
                                                    <h5>Rachel Lannin</h5>
                                                    <p>1172 Ocelot Ave, Chula Vista, CA 91911</p>
                                                    <p>Estimate $470K - $539K</p>
                                                    <p>Submitted on 10/30/2023 7:25 PM</p>
                                                    <div>
                                                        <Button className='leave-btn'>Leave Update</Button>
                                                        <Button className='view-proposal'>View Proposal</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Button className='load-more-btn'>+ Load More</Button>
                                    </Container>
                                </CustomTabPanel>
                            </Box>
                        </Col>

                        {/* <Col md={8}></Col> */}
                    </Row>
                </Container>
            </div>

            <div className='template-container'>
                <Container>
                    <Row className='box-shadow'>
                        <Col md={6}>
                            <div className='seller-proposal-tem'>
                                <div>
                                    <h5>Seller Proposal Template</h5>
                                    <span><IoIosCheckmarkCircle />Completed</span>
                                </div>
                                <div className='tem-status-content'>
                                    <p className='tem-status'>IMMEDIATE PROPOSALS ON</p>
                                    <p>Score 88 / 100</p>
                                    <div className='d-flex justify-content-end mt-3 seller-tem'><Button>Edit Template</Button></div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='buyer-proposal-tem'>
                                <div className='d-flex justify-content-between'>
                                    <div><h5>Buyer Proposal Template</h5></div>
                                    <div><p className='tem-status'>IMMEDIATE PROPOSALS ON</p></div>
                                </div>
                                <p className='progressbar'>100% Your Buyer Proposal Template is up and running!</p>
                                <ProgressBar now={100} />
                                <div className='d-flex justify-content-end mt-3 seller-tem'><Button>Edit Template</Button></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <div className='performance-container'>
                <Container>
                    <Row>
                        <Col>
                            <h5>Performance</h5>
                            <p>These metrics affect your ranking in our matching algorithm</p>
                            <hr></hr>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <div className='performance-card'>
                                <div className='performance-card-top'>
                                    <span><MdOutlineMessage /></span>
                                    <h5>Interview to Win</h5>
                                    <p>How often you win clients once they interview you.</p>
                                </div>
                                <div className='performance-card-bottom'>
                                    <h1>33%</h1>
                                    <p><FaAngleDown />Which is under average (80%)</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className='performance-card'>
                                <div className='performance-card-top'>
                                    <span><LuPhoneIncoming /></span>
                                    <h5>Call Rate</h5>
                                    <p>Percentage of clients who received a call after requesting a call.</p>
                                </div>
                                <div className='performance-card-bottom'>
                                    <h1>100%</h1>
                                    <p><FaAngleDown />Which is over average (70%)</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className='performance-card'>
                                <div className='performance-card-top'>
                                    <span><MdOutlineSettingsPhone /></span>
                                    <h5>Call Time</h5>
                                    <p>How quickly you called clients back.</p>
                                </div>
                                <div className='performance-card-bottom'>
                                    <h1>16 min</h1>
                                    <p><FaAngleDown />Which is faster than average (90 min)</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className='last-performance-card'>
                                <div className='last-performance-card-icon'><span><IoIosMore /></span></div>
                                <div className='last-performance-card-btn'><Button>Show all metrics<GoArrowRight /></Button></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <div className='profile'>
                <Container>
                    <Row>
                        <Col>
                            <h3>Profile</h3>
                            <hr></hr>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <div className='profile-card'>
                                <p>Profile</p>
                                <div>
                                    <CircularProgressWithLabel value={progress} />
                                    <p><span>Your agent profile strength is 100%. Keep your profile up to date to increase chance of winning.</span></p>
                                    <Button>Edit Profile<GoArrowRight /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='status-card'>
                                <p>Status</p>
                                <p><span>Set status Away</span></p>
                                <input type='date'></input>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Agentlayout>
    )
}

export default Agentdashboard;