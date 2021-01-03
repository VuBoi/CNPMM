import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// 
import FormContainer from "../components/Container/FormContainer";
import CheckoutSteps from "../components/CheckOut/CheckoutStep";
import { saveShippingAddress } from "../actions/cart.action";
import { TextField, Button } from "@material-ui/core/";

export default function Shipping(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const shippingAddress = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : { address: "", city: "", postalCode: "", country: "" };
    // 
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    if (!userInfo) {
        props.history.push('/signin');
    }
    if (cartItems.length === 0) {
        props.history.push("/products");
    }

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        props.history.push("/payment");
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Enter Address"
                    name="address"
                    autoComplete="address"
                    autoFocus
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="Enter City"
                    name="city"
                    autoComplete="city"
                    autoFocus
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="postal code"
                    label="Enter postal code"
                    name="postal code"
                    autoComplete="postal code"
                    autoFocus
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />

                <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    id="country"
                    label="Enter country"
                    name="country"
                    autoComplete="country"
                    autoFocus
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Continue
        </Button>
            </Form>
        </FormContainer>
    );
};
