import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Container, Table } from "react-bootstrap";
// 
import {
    Button,
    Select,
    MenuItem,
} from "@material-ui/core/";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
// 
import { addToCart, removeFromCart } from '../actions/cart.action';
// 
import '../assets/css/Cart.css';

export default function Cart(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    // 
    const dispatch = useDispatch();
    // 
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping")
    }
    return (
        <div className="cart">
            <Container>
                <Row>
                    <Col md={8} className="cart-top">
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Your Cart</h2>
                                    <Table className="cart-list">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.length === 0 ?
                                                    <tr><td className="cart-empty"><span>Empty Product In Your Cart !</span></td></tr>
                                                    :
                                                    cartItems.map(item =>
                                                        <tr key={item.product}>
                                                            <td>
                                                            <Link to={"/products/" + item.product}>
                                                                <Image className="cart-img" src={item.image} alt={item.name} rounded/>
                                                            </Link>
                                                            <Link to={"/products/" + item.product}><p className="cart-name">Name: {item.name}</p></Link>
                                                            <p>Price:&nbsp;<span style={{color:"red"}}>${item.price}</span></p>
                                                            Quantity:&nbsp;&nbsp;
                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="demo-simple-select-outlined"
                                                                    value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                                    label="Quantity" >
                                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                                        <MenuItem key={x + 1} value={x + 1} > {x + 1}</MenuItem>))}
                                                                </Select>
                                                            </td>
                                                            <td>
                                                                <Button className="btn-remove" color="primary" variant="contained" onClick={() => removeFromCartHandler(item.product)}><DeleteSweepIcon/></Button>
                                                            </td>
                                                        </tr>
                                                    )
                                            }
                                        </tbody>
                                    </Table>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                <div className="checkout">
                                    <h5>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} item): </h5>
                                    <h2 style={{color:"red"}}>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</h2>
                                    <Button className="btn-checkout" color="primary" variant="contained" onClick={checkoutHandler} disabled={cartItems.length === 0}>Check Out</Button>
                                </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}