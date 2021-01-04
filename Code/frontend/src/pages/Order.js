import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core/";
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import Message from "../components/Message/Message";
import { deliverOrder, detailsOrder, payOrder, receiveOrder } from "../actions/order.action";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_RECEIVE_RESET } from "../constants/order.constant";
import Loading from "../components/Loading/Loading";
import Loader from '../components/Loading/Loader';
// 
import '../assets/css/Order.css';

export default function Order(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const orderPay = useSelector((state) => state.orderPay);
    // , error: errorPay
    const { loading: loadingPay, success: successPay } = orderPay;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    // , error: errorDeliver
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
    // 
    const orderReceive= useSelector((state) => state.orderReceive);
    const { loading: loadingReceive, success: successReceive } = orderReceive;
    //

    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (
            !order ||
            successPay ||
            successDeliver ||
            successReceive ||
            (order && order._id !== orderId)
        ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch({ type:ORDER_RECEIVE_RESET })
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, sdkReady, successPay, successDeliver, successReceive, order]);


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };
    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };
    const receiveHandler = () => {
        dispatch(receiveOrder(order._id));
    };
    //
    // const orderItems = localStorage.getItem("orderItems") ? JSON.parse(localStorage.getItem("orderItems")):{};
    // const x = orderItems.order.orderItems;
    // const y = x.reduce((x,y) => x + y.qty,0)
    // console.log(y)
    


    const userPermission = (userInfo.isAdmin | userInfo.isStaff);
    return (
        loading ? (<Loading />) :
            error ? (<ErrorMessage message={error} />) : (
                <Container>
                    <Link to="/ordersList">
                        <Button variant="contained" color="primary" style={{marginBottom: "20px"}}>Go Back</Button>
                    </Link>
                    {order ? (
                        <>
                            <h1>Order Detail: <span style={{ fontSize: "0.8em", wordWrap: "break-word" }}>{order._id}</span></h1><hr />
                            <Row>
                                <Col md={8}>
                                    <Card>
                                        <ListGroup variant="flush" className="orderinfo">
                                            <ListGroup.Item>
                                                <h2>Shipping</h2>
                                                <Row>
                                                    <Col>
                                                        <p><strong>Name: </strong></p>
                                                        <span>{userInfo.name}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p><strong>Email: </strong></p>
                                                        <span>{userInfo.email}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p><strong>Phone: </strong></p>
                                                        <span>{userInfo.phone}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p><strong>Address: </strong></p>
                                                        <span>{order.shippingAddress.address},
                                                                        {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                                                            {order.shippingAddress.country}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {order.isDelivered ? (
                                                            <Message variant="success">
                                                                Delivered on {order.deliveredAt}
                                                            </Message>
                                                        ) : (
                                                                <Message variant="danger">Not Delivered</Message>
                                                            )}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {order.isReceived ? (
                                                            <Message variant="success">
                                                                Received on {order.receivedAt}
                                                            </Message>
                                                        ) : (
                                                                <Message variant="danger">Not Received</Message>
                                                            )}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h2>Payment Method</h2>
                                                <Row>
                                                    <Col>
                                                        <p><strong>Method: </strong></p>
                                                        <span>{order.paymentMethod ? order.paymentMethod : ""}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {order.isPaid ? (
                                                            <Message variant="success">Paid on {order.paidAt}</Message>
                                                        ) : (
                                                                <Message variant="danger">Not Paid</Message>
                                                            )}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {order.orderItems ? (
                                                <ListGroup.Item>
                                                    <h2>Order Items</h2>
                                                    {order.orderItems.length === 0 ? (
                                                        <Message>Order is empty</Message>
                                                    ) : (
                                                            <ListGroup variant="flush">
                                                                {order.orderItems.map((item, index) => (
                                                                    <ListGroup.Item key={index}>
                                                                        <Row>
                                                                            <Col md={3}>
                                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                                            </Col>
                                                                            <Col>
                                                                                <Link to={"/product/" + item.productId}>
                                                                                    {item.productName}
                                                                                </Link>
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <strong>{item.qty} x ${item.price} = $
                                                                                        {item.qty * item.price}</strong>
                                                                            </Col>
                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>
                                                        )}
                                                </ListGroup.Item>
                                            ) : (
                                                    ""
                                                )}
                                        </ListGroup>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h2>Order Summary</h2>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Items</Col>
                                                    <Col>${order.itemsPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Shipping</Col>
                                                    <Col>${order.shippingPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Tax</Col>
                                                    <Col>${order.taxPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Total</Col>
                                                    <Col>${order.totalPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {
                                                order.paymentMethod === "PayPal" &&
                                                !order.isPaid &&
                                                (
                                                    <ListGroup.Item>
                                                        {loadingPay && <Loader />}
                                                        {!sdkReady ? (
                                                            <Loader />
                                                        ) : (
                                                                <PayPalButton
                                                                    amount={order.totalPrice}
                                                                    onSuccess={successPaymentHandler}
                                                                />
                                                            )}
                                                    </ListGroup.Item>
                                                )
                                            }
                                            {loadingDeliver && <Loader />}
                                            {
                                                userInfo &&
                                                userPermission !== 0  && order.isPaid && !order.isDelivered &&
                                                (
                                                    <ListGroup.Item>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            fullWidth
                                                            onClick={deliverHandler}
                                                        >
                                                            Mark As Delivered
                                                            </Button>
                                                    </ListGroup.Item>
                                                )
                                            }
                                            {loadingReceive && <Loader />}
                                            {userInfo &&
                                                order.isPaid && order.isDelivered && !order.isReceived &&
                                                (
                                                    <ListGroup.Item>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            fullWidth
                                                            onClick={receiveHandler}
                                                        >
                                                            Mark As Received
                                                            </Button>
                                                    </ListGroup.Item>
                                                )
                                            }
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    ) : (
                            ""
                        )}
                </Container>
            )
    )
};