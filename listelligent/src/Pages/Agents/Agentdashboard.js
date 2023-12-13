import React from 'react';
import Agentlayout from '../../components/Agent/Agentlayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Agentdashboard = () => {
    return (
        <Agentlayout>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h1>Agent-Dashboard</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Agentlayout>
    )
}

export default Agentdashboard;