import {
    SET_CODE,
    FETCH_TOKEN_INPROGRESS,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_ERROR,
    REMOVE_TOKEN,
} from "../actions";

let initialState = {
    token: null,
    code: null,
    error: null,
    loading: false,
};

export function fetchTokenReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CODE:
            return { ...state, code: action.payload };
        case FETCH_TOKEN_INPROGRESS:
            return { ...state, loading: true };
        case FETCH_TOKEN_SUCCESS:
            return { ...state, token: action.payload, loading: false };
        case FETCH_TOKEN_ERROR:
            return { ...state, error: action.error };
        case REMOVE_TOKEN:
            return { ...state, token: null };
        default:
            return state;
    }
}
