import { FETCH_TOP_TRACK_ERROR, FETCH_TOP_TRACK_INPROGRESS, FETCH_TOP_TRACK_SUCCESS } from "../actions";

let initialState = {
    topTracks: null,
    error: null,
    loading: true,
};

export function topTracksReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_TOP_TRACK_INPROGRESS: 
            return { ...state, loading: true };
        case FETCH_TOP_TRACK_SUCCESS:
            return { ...state, topTracks: action.payload, loading: false };
        case FETCH_TOP_TRACK_ERROR:
            return { ...state, error: action.error };
        default: 
            return state;
    }
}