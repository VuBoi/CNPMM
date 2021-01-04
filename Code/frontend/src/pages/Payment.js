import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// 
import FormContainer from "../components/Container/FormContainer";
import CheckoutSteps from "../components/CheckOut/CheckoutStep";
import { savePaymentMethod } from "../actions/cart.action";
import {
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@material-ui/core/";

export default function PaymentMethod(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (paymentMethod === "") {
            return;
        }
        dispatch(savePaymentMethod({ paymentMethod }));
        props.history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Select Method</FormLabel>
                    <Row>
                        <Col md="8">
                            <RadioGroup
                                aria-label="paymemtMethod"
                                name="paymemtMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    value="PayPal"
                                    control={<Radio color="primary" />}
                                    label="PayPal or Credit Card"
                                />
                            </RadioGroup>
                        </Col>
                        <Col md="4">
                            <RadioGroup
                                aria-label="paymemtMethod"
                                name="paymemtMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    value="Unsupport!"
                                    control={<Radio color="primary" />}
                                    label="(Updating...)"
                                />
                            </RadioGroup>
                        </Col>
                    </Row>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Continue
        </Button>
            </Form>
        </FormContainer>
    );
};
