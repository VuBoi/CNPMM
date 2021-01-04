import {
    FAVORITE_CREATE_FAIL, FAVORITE_CREATE_REQUEST, FAVORITE_CREATE_SUCCESS, FAVORITE_CREATE_RESET,
    MY_FAVORITE_LIST_REQUEST, MY_FAVORITE_LIST_SUCCESS, MY_FAVORITE_LIST_FAIL,
    FAVORITE_DELETE_REQUEST, FAVORITE_DELETE_SUCCESS, FAVORITE_DELETE_FAIL, FAVORITE_DELETE_RESET,
    FAVORITE_DELETE_IDPR_REQUEST, FAVORITE_DELETE_IDPR_SUCCESS, FAVORITE_DELETE_IDPR_RESET, FAVORITE_DELETE_IDPR_FAIL
} from "../constants/favorite.constant";

function favoriteCreateReducer(state = {}, action) {
    switch (action.type) {
        case FAVORITE_CREATE_REQUEST:
            return { loading: true };
        case FAVORITE_CREATE_SUCCESS:
            return { loading: false, favorite: action.payload, success: true };
        case FAVORITE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case FAVORITE_CREATE_RESET:
            return {};
        default: return state;
    }
}

function myFavoriteListReducer(state = { favorites: [] }, action) {
    switch (action.type) {
        case MY_FAVORITE_LIST_REQUEST:
            return { loading: true, favorites: [] };
        case MY_FAVORITE_LIST_SUCCESS:
            return { loading: false, favorites: action.payload };
        case MY_FAVORITE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function favoriteDeleteReducer(state = {}, action) {
    switch (action.type) {
        case FAVORITE_DELETE_REQUEST:
            return { loading: true };
        case FAVORITE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case FAVORITE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case FAVORITE_DELETE_RESET:
            return {};
        default: return state;
    }
}

function favoriteDeleteProductIdReducer(state = {}, action) {
    switch (action.type) {
        case FAVORITE_DELETE_IDPR_REQUEST:
            return { loading: true };
        case FAVORITE_DELETE_IDPR_SUCCESS:
            return { loading: false, success: true };
        case FAVORITE_DELETE_IDPR_FAIL:
            return { loading: false, error: action.payload };
        case FAVORITE_DELETE_IDPR_RESET:
            return {};
        default: return state;
    }
}

export {
    favoriteCreateReducer,
    myFavoriteListReducer,
    favoriteDeleteReducer,
    favoriteDeleteProductIdReducer
}