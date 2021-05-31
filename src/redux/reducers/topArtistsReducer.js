import { FETCH_TOP_ARTIST_ERROR, FETCH_TOP_ARTIST_INPROGRESS, FETCH_TOP_ARTIST_SUCCESS } from "../actions";

let initialState = {
    topArtists: null,
    error: null,
    loading: true,
};

export function topArtistsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_TOP_ARTIST_INPROGRESS: 
            return { ...state, loading: true };
        case FETCH_TOP_ARTIST_SUCCESS:
            return { ...state, topArtists: action.payload, loading: false };
        case FETCH_TOP_ARTIST_ERROR:
            return { ...state, error: action.error };
        default: 
            return state;
    }
}