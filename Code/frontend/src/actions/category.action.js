import {
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL, 
    CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_FAIL, 
    CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST,
    CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL,
    CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, 
} from '../constants/category.constant';
import axios from 'axios';

const listCategory = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await axios.get("/api/categories");
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: CATEGORY_LIST_FAIL, payload: message })
    }
}


const detailsCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: categoryId });
        const { data } = await axios.get("/api/categories/" + categoryId);
        dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: CATEGORY_DETAILS_FAIL, payload: message })
    }
}

const deleteCategory = (categoryId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
        const { data } = await axios.delete("/api/categories/" + categoryId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true })
    }
    catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: CATEGORY_DELETE_FAIL, payload: message })
    }
}


const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put("/api/categories/" + category._id, category, {
            headers: { 
                Authorization: 'Bearer ' + userInfo.token 
            }
        });
        dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATEGORY_UPDATE_FAIL, payload: message });
    }
};


const createCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST, payload: category });
        const { userSignin: { userInfo } } = getState();
        if (!category._id) {
            const { data } = await axios.post('/api/categories', category, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
        } else {
            const { data } = await axios.put('/api/categories/' + category._id, category, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            }
            );
            dispatch({ type: CATEGORY_CREATE_FAIL, payload: data });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CATEGORY_CREATE_FAIL, payload: message });
    }
};

export { listCategory, detailsCategory, deleteCategory, updateCategory, createCategory };