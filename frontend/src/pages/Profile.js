import React from "react";
import { Row, Col, ListGroup, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
// 
import ProfileEdit from '../components/Profile/ProfileEdit';

export default function Profile(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <Container>
            <Row>
                <Col lg={2} md={0}></Col>
                <Col lg={4} md={6}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2 className="userprofile-title" style={{ textAlign: "center" }}>User Profile</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Name:</Col>
                                </Row>
                                <Row>
                                    <Col><strong>{userInfo.name}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Email:</Col>
                                </Row>
                                <Row>
                                    <Col><strong>{userInfo.email}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Phone:</Col>
                                </Row>
                                <Row>
                                    <Col><strong>{userInfo.phone}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Admin:</Col>
                                </Row>
                                <Row>
                                    <Col><strong>{userInfo.isAdmin.toString().toUpperCase()}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={4} md={6}>
                    <Card><ProfileEdit /></Card>
                </Col>
                <Col lg={2} md={0}></Col>
            </Row>
        </Container>
    );
};
