import { CLEAR_ERROR, FETCH_TOP_TRACK_ERROR, FETCH_TOP_TRACK_INPROGRESS, FETCH_TOP_TRACK_SUCCESS } from "../actions";

let initialState = {
	topTracks: null,
	topTracksMonths: null,
	topTracksWeeks: null,
	error: null,
	loading: false,
};

export function topTracksReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_TOP_TRACK_INPROGRESS:
			return { ...state, loading: true };
		case FETCH_TOP_TRACK_SUCCESS:
			return {
				...state,
				topTracks: action.payload.alltime,
				topTracksMonths: action.payload.months,
				topTracksWeeks: action.payload.weeks,
				loading: false,
				error: null,
			};
		case FETCH_TOP_TRACK_ERROR:
			return { ...state, loading: false, error: action.error };
		case CLEAR_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
}
