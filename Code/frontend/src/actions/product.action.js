import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
    PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, 
    PRODUCT_LIST_SEARCH_FAIL, PRODUCT_LIST_SEARCH_REQUEST, PRODUCT_LIST_SEARCH_SUCCESS, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL,
} from '../constants/product.constant';
import axios from 'axios';

const listProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PRODUCT_LIST_FAIL, payload: message })
    }
}

const listSearchProduct = (name) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_SEARCH_REQUEST });
        const { data } = await axios.get("/api/search/products?q=" + name);
        dispatch({ type: PRODUCT_LIST_SEARCH_SUCCESS, payload: data })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PRODUCT_LIST_SEARCH_FAIL, payload: message })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: message })
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
        const { data } = await axios.delete("/api/products/" + productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message })
    }
}


const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put("/api/products/" + product._id, product, {
            headers: { 
                Authorization: 'Bearer ' + userInfo.token 
            }
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
    }
};


const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
        const { userSignin: { userInfo } } = getState();
        if (!product._id) {
            const { data } = await axios.post('/api/products', product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
        } else {
            const { data } = await axios.put('/api/products/' + product._id, product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            }
            );
            dispatch({ type: PRODUCT_CREATE_FAIL, payload: data });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post('/api/products/'+ productId + '/reviews',
        review,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: message });
    }
  };

export { listProduct, detailsProduct, deleteProduct, updateProduct, createProduct, listSearchProduct, saveProductReview };