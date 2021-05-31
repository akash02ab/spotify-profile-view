import { FETCH_USER_ERROR, FETCH_USER_INPROGRESS, FETCH_USER_SUCCESS } from "../actions";

let initialState = {
    user: null,
    error: null,
    loading: true,
};

export function userDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_INPROGRESS:
            return { ...state, loading: true };
        case FETCH_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false , error:null};
        case FETCH_USER_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}
