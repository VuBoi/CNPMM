import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, NavDropdown, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
//
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button } from "@material-ui/core/";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
//
import '../../assets/css/Header.css';

export default function MenuUserDesktop(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    // 
    const [opendrop, setOpen] = useState(false)
    // 
    const toggle2 = () => setOpen(!opendrop)
    return (
        <>
            {
                userInfo ?
                    (   
                        <NavDropdown title={userInfo.name} id="username">
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/signout">
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/ordershistory">
                                <NavDropdown.Item>My Order</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/myfavorite">
                                <NavDropdown.Item>My Favorite</NavDropdown.Item>
                            </LinkContainer>
                            {
                                userInfo.isAdmin && userInfo.isStaff ? 
                                (
                                    <>
                                        <hr style={{ margin: "0px" }} />
                                        <Nav.Link onClick={toggle2} className="menu-manage">Manage<ArrowDropDownIcon /></Nav.Link>
                                        <Collapse in={opendrop} className="menu-manage__item">
                                            <div>
                                                <Link to="/productsListManage" style={{ color: "black" }}><ArrowForwardIosIcon />Product</Link>
                                                <Link to="/ordersList" style={{ color: "black" }}><ArrowForwardIosIcon />Order</Link>
                                                <Link to="/usersList" style={{ color: "black" }}><ArrowForwardIosIcon />User</Link>
                                                <Link to="/categoriesListManage" style={{ color: "black" }}><ArrowForwardIosIcon />Category</Link>
                                            </div>
                                        </Collapse>
                                    </>
                                ) :
                                userInfo.isAdmin && !userInfo.isStaff ? 
                                (
                                    <>
                                        <hr style={{ margin: "0px" }} />
                                        <Nav.Link onClick={toggle2} className="menu-manage">Manage<ArrowDropDownIcon /></Nav.Link>
                                        <Collapse in={opendrop} className="menu-manage__item">
                                            <div>
                                                <Link to="/productsListManage" style={{ color: "black" }}><ArrowForwardIosIcon />Product</Link>
                                                <Link to="/ordersList" style={{ color: "black" }}><ArrowForwardIosIcon />Order</Link>
                                                <Link to="/usersList" style={{ color: "black" }}><ArrowForwardIosIcon />User</Link>
                                                <Link to="/categoriesListManage" style={{ color: "black" }}><ArrowForwardIosIcon />Category</Link>
                                            </div>
                                        </Collapse>
                                    </>
                                ) :
                                !userInfo.isAdmin && userInfo.isStaff ?
                                (
                                    <>
                                        <hr style={{ margin: "0px" }} />
                                        <Nav.Link onClick={toggle2} className="menu-manage">Manage<ArrowDropDownIcon /></Nav.Link>
                                        <Collapse in={opendrop} className="menu-manage__item">
                                            <div>
                                                <Link to="/productsListManage" style={{ color: "black" }}><ArrowForwardIosIcon />Product</Link>
                                                <Link to="/ordersList" style={{ color: "black" }}><ArrowForwardIosIcon />Order</Link>
                                                <Link to="/categoriesListManage" style={{ color: "black" }}><ArrowForwardIosIcon />Category</Link>
                                            </div>
                                        </Collapse>
                                    </>
                                ) :
                                (
                                    <></>
                                )
                            }
                            
                        </NavDropdown>
                    ) :
                    (
                        <div className="btn-sign">
                            <Link to="/signin">
                                <Button variant="contained">Sign in</Button>
                            </Link>&nbsp;
                            <Link to="/signup">
                                <Button variant="contained">Sign up</Button>
                            </Link>
                        </div>
                    )
            }
        </>
    )

}