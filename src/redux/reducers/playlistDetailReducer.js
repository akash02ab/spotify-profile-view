import { CLEAR_ERROR, CLEAR_PLAYLIST_DETAIL, FETCH_PLAYLIST_DETAIL_ERROR, FETCH_PLAYLIST_DETAIL_INPROGRESS, FETCH_PLAYLIST_DETAIL_SUCCESS } from "../actions";

const initialState = {
  details: null,
  loading: false,
  error: null
};

export const playlistDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_DETAIL_INPROGRESS:
      return { ...state, loading: true };
    case FETCH_PLAYLIST_DETAIL_SUCCESS:
      return { ...state, details: action.payload, loading: false, error: null };
    case FETCH_PLAYLIST_DETAIL_ERROR:
      return { ...state, loading: false, error: action.error };
    case CLEAR_PLAYLIST_DETAIL: 
      return { ...state, details: null };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default: return state;
  }
}