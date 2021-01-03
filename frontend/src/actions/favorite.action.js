import axios from "axios";
import {
    FAVORITE_CREATE_FAIL, FAVORITE_CREATE_REQUEST, FAVORITE_CREATE_SUCCESS,
    MY_FAVORITE_LIST_REQUEST, MY_FAVORITE_LIST_SUCCESS, MY_FAVORITE_LIST_FAIL,
    FAVORITE_DELETE_REQUEST, FAVORITE_DELETE_SUCCESS, FAVORITE_DELETE_FAIL, FAVORITE_DELETE_IDPR_REQUEST, FAVORITE_DELETE_IDPR_SUCCESS, FAVORITE_DELETE_IDPR_FAIL,
} from "../constants/favorite.constant";

const createFavorite = (favorite) => async (dispatch, getState) => {
    try {
        dispatch({ type: FAVORITE_CREATE_REQUEST, payload: favorite });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post("/api/favorites", favorite, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        });
        dispatch({ type: FAVORITE_CREATE_SUCCESS, payload: data });
        dispatch(listMyFavorites());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: FAVORITE_CREATE_FAIL, payload: message });
    }
}

const listMyFavorites = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_FAVORITE_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get("/api/favorites/myfavorites", {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: MY_FAVORITE_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: MY_FAVORITE_LIST_FAIL, payload: message });
    }
}


const deleteFavorite = (favoriteId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FAVORITE_DELETE_REQUEST, payload: favoriteId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/favorites/" + favoriteId, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: FAVORITE_DELETE_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: FAVORITE_DELETE_FAIL, payload: message });
    }
}

const deleteProductIdFavorite = (ProductId) => async (dispatch, getState) => {
    try {
        dispatch({ type: FAVORITE_DELETE_IDPR_REQUEST, payload: ProductId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/favorites/productId/" + ProductId, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: FAVORITE_DELETE_IDPR_SUCCESS, payload: data });
        dispatch(listMyFavorites());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: FAVORITE_DELETE_IDPR_FAIL, payload: message });
    }
}


export { createFavorite, listMyFavorites, deleteFavorite, deleteProductIdFavorite};