import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav, Collapse } from 'react-bootstrap';
import OutsideClickHandler from 'react-outside-click-handler';
//
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from "@material-ui/core/";
//
import '../../assets/css/Header.css';

export default function Drawer(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    // 
    const [values, setOpen] = useState({
        opendrop: false,
        openlogin: false,
    })
    // 
    const toggle1 = () => setOpen({ ...values, openlogin: !values.openlogin })
    const toggle2 = () => setOpen({ ...values, opendrop: !values.opendrop })
    const closeMenu = () => {
        document.querySelector('.sidenav').classList.remove('active');
        setOpen(!props.openside)
    };
    return (
        <OutsideClickHandler onOutsideClick={() => { closeMenu() }}>
            <div className="wrapper">
                <div className="sidenav">
                    {userInfo ?
                        (
                            <div>
                                <Nav.Link onClick={toggle1} id="username-mobile">{userInfo.name}<ArrowDropDownIcon /></Nav.Link>
                                <Collapse in={values.openlogin} className="username">
                                    <div>
                                        <Link to="/profile" onClick={closeMenu}><ArrowForwardIosIcon />Profile</Link>
                                        <Link to="/signout" onClick={closeMenu}><ArrowForwardIosIcon />Logout</Link>
                                        <Link to="/ordershistory" onClick={closeMenu}><ArrowForwardIosIcon />My Order</Link>
                                        <Link to="/myfavorite" onClick={closeMenu}><ArrowForwardIosIcon />My Favorite</Link>
                                    </div>
                                </Collapse>
                                {
                                    userInfo.isAdmin && userInfo.isStaff ? 
                                    (
                                        <>
                                            <hr style={{ margin: "0px" }} />
                                            <Nav.Link onClick={toggle2}>Manage<ArrowDropDownIcon /></Nav.Link>
                                            <Collapse in={values.opendrop} className="menu-manage__item">
                                                <div>
                                                    <Link to="/productsListManage" onClick={closeMenu}><ArrowForwardIosIcon />Product</Link>
                                                    <Link to="/ordersList" onClick={closeMenu}><ArrowForwardIosIcon />Order</Link>
                                                    <Link to="/usersList" onClick={closeMenu}><ArrowForwardIosIcon />User</Link>
                                                    <Link to="/categoriesListManage" onClick={closeMenu}><ArrowForwardIosIcon />Category</Link>
                                                </div>
                                            </Collapse>
                                        </>
                                    ):
                                    userInfo.isAdmin && !userInfo.isStaff ? 
                                    (
                                        <>
                                            <hr style={{ margin: "0px" }} />
                                            <Nav.Link onClick={toggle2}>Manage<ArrowDropDownIcon /></Nav.Link>
                                            <Collapse in={values.opendrop} className="menu-manage__item">
                                                <div>
                                                    <Link to="/productsListManage" onClick={closeMenu}><ArrowForwardIosIcon />Product</Link>
                                                    <Link to="/ordersList" onClick={closeMenu}><ArrowForwardIosIcon />Order</Link>
                                                    <Link to="/usersList" onClick={closeMenu}><ArrowForwardIosIcon />User</Link>
                                                    <Link to="/categoriesListManage" onClick={closeMenu}><ArrowForwardIosIcon />Category</Link>
                                                </div>
                                            </Collapse>
                                        </>
                                    ):
                                    !userInfo.isAdmin && userInfo.isStaff ?
                                    (
                                        <>
                                            <hr style={{ margin: "0px" }} />
                                            <Nav.Link onClick={toggle2}>Manage<ArrowDropDownIcon /></Nav.Link>
                                            <Collapse in={values.opendrop} className="menu-manage__item">
                                                <div>
                                                    <Link to="/productsListManage" onClick={closeMenu}><ArrowForwardIosIcon />Product</Link>
                                                    <Link to="/ordersList" onClick={closeMenu}><ArrowForwardIosIcon />Order</Link>
                                                    <Link to="/categoriesListManage" onClick={closeMenu}><ArrowForwardIosIcon />Category</Link>
                                                </div>
                                            </Collapse>
                                        </>
                                    ):
                                    (
                                        <></>
                                    )
                                }
                            </div>
                        ) :
                        (
                            <div className="btn-sign-mobile">
                                <Link to="/signin" onClick={closeMenu}><Button variant="contained" color="primary">Sign in</Button></Link>
                                <Link to="/signup" onClick={closeMenu}><Button variant="contained" color="primary">Sign up</Button></Link>
                            </div>
                        )
                    }
                    {userInfo ? (
                        <div></div>) :
                        (<hr></hr>)
                    }
                    <div className="other-link">
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <Link to="/productsList" onClick={closeMenu}>All Books</Link>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    )
}