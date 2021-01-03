import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// 
import {
    userSigninReducer,
    userSignupReducer,
    userUpdateReducer,
    userUpdateProfileReducer,
    userDetailsReducer,
    userListReducer,
    userDeleteReducer,
} from '../reducers/user.reducer';
import {
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer,
    productCreateReducer,
    productListSearchReducer,
    productReviewSaveReducer
} from '../reducers/product.reducer';
import { cartReducer } from '../reducers/cart.reducer';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    orderListReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderReceiveReducer
} from '../reducers/order.reducer';
import {
    categoryListReducer,
    categoryDetailsReducer,
    categoryDeleteReducer,
    categoryUpdateReducer,
    categoryCreateReducer,
} from '../reducers/category.reducer';
import {
    favoriteCreateReducer,
    myFavoriteListReducer,
    favoriteDeleteReducer,
    favoriteDeleteProductIdReducer
} from '../reducers/favorite.reducer';

// 

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "";
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userSignin: {
        userInfo: userInfoFromStorage
    }
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    // 
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productListSearch: productListSearchReducer,
    productReviewSave: productReviewSaveReducer,
    // 
    cart: cartReducer,
    // 
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    orderReceive: orderReceiveReducer,
    // 
    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryCreate: categoryCreateReducer,
    // 
    favoriteCreate: favoriteCreateReducer,
    myFavoriteList: myFavoriteListReducer,
    favoriteDelete: favoriteDeleteReducer,
    favoriteDeleteProductId: favoriteDeleteProductIdReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Redux Developer Tool
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;

