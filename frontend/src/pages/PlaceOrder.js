import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, makeStyles } from "@material-ui/core/";
import { ORDER_CREATE_RESET } from '../constants/order.constant';
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import CheckoutSteps from "../components/CheckOut/CheckoutStep";
import { createOrder } from "../actions/order.action";

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: "#fff",
  },
}));

export default function PlaceOrder(props) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const dispatch = useDispatch();

  if (!paymentMethod.paymentMethod) {
    props.history.push("/payment");
  }

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  //
  const placeOrderHandler = () => {
    dispatch(createOrder({ 
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod.paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice  
   }));
  };
  // 
  useEffect(() => {
    if (success) {
      props.history.push("/orders/" + order._id);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // 
  }, [dispatch, order, props.history, success]);

  return (
    <>
      {error && ( <ErrorMessage message={error} reset={ORDER_CREATE_RESET} />)}
      <Container fluid style={{paddingTop: "25px"}}>
      <CheckoutSteps step1 step2 step3 />
        <Row>
          <Col md={8}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address: </strong>
                    {shippingAddress.address}, {shippingAddress.city}{" "}
                    {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <strong>Method: </strong>
                  {paymentMethod.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {cartItems.length === 0 ? (
                    <>Your cart is empty</>
                  ) : (
                      <ListGroup variant="flush">
                        {cartItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={3}>
                                <Link to={"/products/" + item.product}>
                                  <Image src={item.image} alt={item.name} fluid rounded />
                                </Link>
                              </Col>
                              <Col>
                                <Link to={"/products/" + item.product}>
                                  <p>{item.name}</p>
                                </Link>
                                <p>Quantity: {item.qty}</p>
                              </Col>
                              <Col md={4}>
                                <p>Price: {item.price}</p>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          {/*  */}
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={cart.cartItems === 0 || loading}
                    onClick={placeOrderHandler}
                  >
                    {loading ? (
                      <CircularProgress
                        color="inherit"
                        className={classes.prgressColor}
                      />
                    ) : (
                        <>Place Order</>
                      )}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};