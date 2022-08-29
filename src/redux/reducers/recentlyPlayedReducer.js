import {
	CLEAR_ERROR,
	FETCH_RECENTLY_PLAYED_ERROR,
	FETCH_RECENTLY_PLAYED_INPROGRESS,
	FETCH_RECENTLY_PLAYED_SUCCESS,
} from "../actions";

const initialState = {
	loading: false,
	error: null,
	recentlyPlayed: null,
};

export const recentlyPlayedReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_RECENTLY_PLAYED_INPROGRESS:
			return { ...state, loading: true };
		case FETCH_RECENTLY_PLAYED_SUCCESS:
			return { ...state, loading: false, error: null, recentlyPlayed: action.payload };
		case FETCH_RECENTLY_PLAYED_ERROR:
			return { ...state, loading: false, error: action.error };
		case CLEAR_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
};
