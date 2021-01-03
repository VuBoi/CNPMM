import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//
import course from '../../assets/images/course.png';
import skillup from '../../assets/images/skillup.png';
import certificate from '../../assets/images/certificate.png';
// 
import '../../assets/css/FeaturesBox.css';

export default function FeaturesBox(props) {
    return (
        <div className="features-box">
            <Container>
                <Row>
                    <Col md lg>
                        <div className="box-item">
                            <img src={course} alt="Course"></img>
                            <div className="box-info">
                                <h5 className="box-info__title">
                                    Find New Books
                                </h5>
                                <span className="box-info__des">
                                    You can find book newest
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col md lg>
                        <div className="box-item">
                            <img src={skillup} alt="SkillUp"></img>
                            <div className="box-info">
                                <h5 className="box-info__title">
                                    Up Your Skill
                                </h5>
                                <span className="box-info__des">
                                    You can get new skill through read book
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col md lg>
                        <div className="box-item">
                            <img src={certificate} alt="Certificate"></img>
                            <div className="box-info">
                                <h5 className="box-info__title">
                                    Earn A Certificate
                                </h5>
                                <span className="box-info__des">
                                    Get Certificate from a leading university
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}