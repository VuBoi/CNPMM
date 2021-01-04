import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';
// 
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
// 
import logo from '../../assets/images/logo.png';
import '../../assets/css/Footer.css';

export default function Footer(props) {
    return (

        <div className="footer">
            <Container>
                <Row>
                    <div className="col-md-4 col-lg-4 footer-about">
                        <img className="logo-footer" src={logo} alt="logo-footer" data-at2x={logo} />
                        <p className="logo-slogan">We are committed to providing the best courses to you with all your heart and enthusiasm!<br></br> Hope You Have A Nice Day :3</p>
                    </div>
                    <div className="col-md-4 col-lg-4 offset-lg-1 footer-contact">
                        <h3>Contact</h3>
                        <p><LocationOnIcon />Ho Chi Minh CiTy 1 Vo Van Ngan</p>
                        <p><PhoneIcon />Phone:(84) 123456789</p>
                        <p><EmailIcon />Email: <a href="mailto:kuroc@gmail.com" className="email-footer">kuro@gmail.com</a></p>
                        <p><TelegramIcon />Telegram: update...</p>
                    </div>
                    <div className="col-md-4 col-lg-3 footer-social">
                        <h3>Follow us</h3>
                        <p>
                            <Link to="#"><FacebookIcon /></Link>
                            <Link to="#"><TelegramIcon /></Link>
                            <Link to="#"><YouTubeIcon /></Link>
                            <Link to="#"><TwitterIcon /></Link>
                        </p>
                    </div>
                </Row>
            </Container>
        </div>
    )
}