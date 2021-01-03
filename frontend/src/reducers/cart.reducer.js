import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET,
    CART_SAVE_PAYMENT,
    CART_SAVE_SHIPPING
} from "../constants/cart.constant";
//  shippingAddress: {}, paymentMethod: "" 
function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                return {
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                };
            }
            else {
                return { cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload) }
        case CART_SAVE_SHIPPING:
            return { ...state, shippingAddress: action.payload };
        case CART_SAVE_PAYMENT:
            return { ...state, paymentMethod: action.payload };
        case CART_RESET:
            return {
                cartItems: [],
                shippingAddress: {},
                paymentMethod: "",
            };
        default:
            return state
    }
}

export { cartReducer };