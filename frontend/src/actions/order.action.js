import axios from "axios";
import Axios from "axios";
import { CART_RESET } from "../constants/cart.constant";
import {
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
    ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, 
    ORDER_RECEIVE_REQUEST, ORDER_RECEIVE_SUCCESS, ORDER_RECEIVE_FAIL
} from "../constants/order.constant";

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post("/api/orders", order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_RESET });
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_CREATE_FAIL, payload: message });
    }
}

const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders/myorders", {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: MY_ORDER_LIST_FAIL, payload: message });
    }
}

const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders", {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders/" + orderId, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
        localStorage.setItem("orderItems", JSON.stringify(data));
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/orders/" + orderId, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
}

const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = Axios.put("/api/orders/" + orderId + "/deliver", {}, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token },
        }
        );
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
};

const receiveOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_RECEIVE_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = Axios.put("/api/orders/" + orderId + "/receive", {}, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token },
        }
        );
        dispatch({ type: ORDER_RECEIVE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_RECEIVE_FAIL, payload: message });
    }
};

export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder, deliverOrder, receiveOrder };