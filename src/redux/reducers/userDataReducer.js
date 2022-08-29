import { CLEAR_ERROR, FETCH_USER_ERROR, FETCH_USER_INPROGRESS, FETCH_USER_SUCCESS, UPDATE_PATH } from "../actions";

let initialState = {
	user: null,
	error: null,
	path: "/profile",
	loading: false,
};

export function userDataReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_INPROGRESS:
			return { ...state, loading: true };
		case FETCH_USER_SUCCESS:
			return { ...state, loading: false, error: null, user: action.payload };
		case FETCH_USER_ERROR:
			return { ...state, loading: false, error: action.error };
		case UPDATE_PATH:
			return { ...state, loading: false, path: action.payload };
		case CLEAR_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
}
