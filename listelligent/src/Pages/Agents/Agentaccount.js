import React from 'react';
import '../../Style/Agents/agentaccount.css';
import Agentlayout from '../../components/Agent/Agentlayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FiArrowLeft } from "react-icons/fi";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FaCheck } from "react-icons/fa";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const Agentaccount = () => {

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Agentlayout>
            <div className='account-header-container'>
                <Container>
                    <Row>
                        <Col>
                            <div className='account-header'>
                                <Button><FiArrowLeft />Go back to Dashboard</Button>
                                <h1>Account Settings</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className='account-forms'>
                <Container>
                    <Row>
                        <Col md={3}>
                            <div className='acoount-tabs'>
                                <h5>MY ACCOUNT</h5>
                                <ul>
                                    <li type="button" aria-expanded="false" class="accordion-button collapsed">Client Preferences</li>
                                    <li>Contact Info</li>
                                    <li>Additional Contact Info</li>
                                    <li>Password</li>
                                    <li>Brokerage Information</li>
                                    <li>Away Status</li>
                                    <li>Notifications</li>
                                    <li>Important Documents</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={9}>
                            <div className='account-content'>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Client Preferences</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='client-preference-content'>
                                                <Row className='border-bottom'>
                                                    <Col md={4}>
                                                        <div className='preferences-title'>
                                                            <h6>Seller Preferences</h6>
                                                        </div>
                                                    </Col>
                                                    <Col md={3}>
                                                        <div className='preferences-checkbox'>
                                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                                <Form.Check type="checkbox" label="Enable price range (Minimum price)" />
                                                                <Form.Label className='ps-4 mt-3'>Enable price range (Maximum price)</Form.Label>
                                                            </Form.Group>
                                                        </div>
                                                    </Col>
                                                    <Col md={5}>
                                                        <div className='preferences-input'>
                                                            <Form.Group className="mb-4">
                                                                <Form.Control type="text" placeholder="$500,000" />
                                                            </Form.Group>

                                                            <Form.Group className="mb-4">
                                                                <Form.Control type="text" placeholder="$3000,000" />
                                                            </Form.Group>
                                                        </div>
                                                    </Col>
                                                </Row>


                                                <Row className='border-bottom mt-3'>
                                                    <Col md={4}>
                                                        <div className='preferences-title'>
                                                            <h6>Buyer Preferences</h6>
                                                        </div>
                                                    </Col>
                                                    <Col md={8}>
                                                        <div className='preferences-checkbox'>
                                                            <Form.Group className="mb-5">
                                                                <Form.Check className='mb-3' type="checkbox" label="Work with buyers" />
                                                                <Form.Check className='mb-3' type="checkbox" label="Work with a minimum price" />

                                                                <Form.Group className="mb-4">
                                                                    <Form.Control type="text" placeholder="$600,000" />
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </div>
                                                    </Col>
                                                </Row>


                                                <Row className='border-bottom mt-3'>
                                                    <Col md={4}>
                                                        <div className='preferences-title'>
                                                            <h6>Service Areas</h6>
                                                        </div>
                                                    </Col>
                                                    <Col md={8}>
                                                        <div className='service-area-content'>
                                                            <p>Work in these cities</p>
                                                            <p>7/7</p>
                                                        </div>
                                                        <p>You can add up to 7 service cities. Adding more service cities increases your chances of getting more leads</p>
                                                        <FormControl sx={{ m: 1, width: 300 }}>
                                                            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                                                            <Select
                                                                labelId="demo-multiple-chip-label"
                                                                id="demo-multiple-chip"
                                                                multiple
                                                                value={personName}
                                                                onChange={handleChange}
                                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {names.map((name) => (
                                                                    <MenuItem
                                                                        key={name}
                                                                        value={name}
                                                                        style={getStyles(name, personName, theme)}
                                                                    >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <p>Don't work in these cities</p>
                                                        <select class="form-select mb-4" aria-label="Default select example">
                                                            <option selected>Select...</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </Col>
                                                </Row>

                                                <div className='form-submit-btn-contener'>
                                                    <Button className='form-submit-btn'>Save Changes</Button>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Contact Info</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='contact-info'>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Full Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Justin S. Santolaya" />
                                                    </Form.Group>
                                                    <Row className='mb-3 border-bottom'>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control type="email" placeholder="justinsantolaya@hotmail.com" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Mobile Phone</Form.Label>
                                                                <Form.Control type="text" placeholder="(619) 206-9633" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div className='form-submit-btn-contener'>
                                                        <Button className='form-submit-btn'>Save Changes</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Additional Contact Info</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='additional-contact-info'>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Full Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Justin S. Santolaya" />
                                                    </Form.Group>
                                                    <Row className='mb-3 border-bottom'>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control type="email" placeholder="justinsantolaya@hotmail.com" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Mobile Phone</Form.Label>
                                                                <Form.Control type="text" placeholder="(619) 206-9633" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div className='form-submit-btn-contener'>
                                                        <Button className='form-submit-btn'>Save Changes</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Password</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='password-accordion'>
                                                <Form className='border-bottom'>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Current Password</Form.Label>
                                                        <Form.Control type="text" placeholder="" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>New Password</Form.Label>
                                                        <Form.Control type="email" placeholder="" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Repeat new Password</Form.Label>
                                                        <Form.Control type="text" placeholder="" />
                                                    </Form.Group>
                                                </Form>
                                                <div className='form-submit-btn-contener'>
                                                    <Button className='form-submit-btn'>Save Changes</Button>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Brokerage Information</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='brokerage-info-contener'>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Brokerage</Form.Label>
                                                        <Form.Control type="text" placeholder="NextHome" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control type="text" placeholder="2173 Salk Ave" />
                                                    </Form.Group>
                                                    <Row className='mb-3'>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Unit / Suite</Form.Label>
                                                                <Form.Control type="text" placeholder="Unit / Suite" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Zip code</Form.Label>
                                                                <Form.Control type="text" placeholder="Zip code" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3 border-bottom'>
                                                        <Col md={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Managing Broker Name</Form.Label>
                                                                <Form.Control type="text" placeholder="Richard Kuan" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Managing Broker Email</Form.Label>
                                                                <Form.Control type="email" placeholder="ginniemac@gmail.com" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Managing Broker Phone</Form.Label>
                                                                <Form.Control type="text" placeholder="7605797378" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Form.Check className='mb-3' type="checkbox" label="Do you work from home? Add a secondary office address" />
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control type="text" placeholder="Secondary Office Address" />
                                                    </Form.Group>
                                                    <Row className='mb-3 border-bottom'>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Unit / Suite</Form.Label>
                                                                <Form.Control type="text" placeholder="Unit / Suite" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Zip code</Form.Label>
                                                                <Form.Control type="text" placeholder="Zip code" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <div className='form-submit-btn-contener'>
                                                        <Button className='form-submit-btn'>Save Changes</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Away Status</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='away-status-contener'>
                                                <p>You can turn on away status and set a date range if you are not able to service the referrals.</p>
                                                <label class="toggler-wrapper style-1">
                                                    <input type="checkbox" />
                                                    <div class="toggler-slider">
                                                        <div class="toggler-knob"></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Notifications</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='notification border-bottom'>
                                                <Form.Check className='mb-4' type="checkbox" label="Notify me via emails" />
                                                <Form.Check className='mb-4' type="checkbox" label="Notify me via text messages" />
                                                <Form.Check className='mb-4' type="checkbox" label="Enable push notification for desktop device" />
                                            </div>
                                            <div className='form-submit-btn-contener'>
                                                <Button className='form-submit-btn'>Save Changes</Button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Important Documents</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='imp-doc-accordian'>
                                                <Row className='mb-3 border-bottom'>
                                                    <Col md={4}>
                                                        <p>Seller Referral Agreement</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <p><FaCheck />Signed by agent and broker</p>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Button>Re-sign</Button>
                                                        <Button>Download</Button>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3 border-bottom'>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Richard Kuan" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Email</Form.Label>
                                                            <Form.Control type="email" placeholder="ginniemac@gmail.com" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Phone</Form.Label>
                                                            <Form.Control type="text" placeholder="7605797378" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3 border-bottom'>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Richard Kuan" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Email</Form.Label>
                                                            <Form.Control type="email" placeholder="ginniemac@gmail.com" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3 border-bottom'>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Richard Kuan" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Managing Broker Email</Form.Label>
                                                            <Form.Control type="email" placeholder="ginniemac@gmail.com" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Agentlayout>
    )
}

export default Agentaccount;