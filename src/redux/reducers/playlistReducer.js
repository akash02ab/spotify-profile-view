import { CLEAR_ERROR, FETCH_PLAYLIST_ERROR, FETCH_PLAYLIST_INPROGRESS, FETCH_PLAYLIST_SUCCESS } from "../actions";

const initialState = {
	loading: false,
	error: null,
	playlists: null,
};

export const playlistReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PLAYLIST_INPROGRESS:
			return { ...state, loading: true };
		case FETCH_PLAYLIST_SUCCESS:
			return { ...state, loading: false, error: null, playlists: action.payload };
		case FETCH_PLAYLIST_ERROR:
			return { ...state, loading: false, error: action.error };
		case CLEAR_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
};