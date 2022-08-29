import { CLEAR_ERROR, CLEAR_TRACK_DETAILS, FETCH_TRACK_DETAILS_ERROR, FETCH_TRACK_DETAILS_INPROGRESS, FETCH_TRACK_DETAILS_SUCCESS } from "../actions";

let initialState = {
  trackDetails: null,
  loading: false,
  error: null
};

export function trackDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACK_DETAILS_INPROGRESS:
      return { ...state, loading: true };
    case FETCH_TRACK_DETAILS_SUCCESS:
      return { ...state, trackDetails: action.payload, loading: false, error: null };
    case FETCH_TRACK_DETAILS_ERROR:
      return { ...state, loading: false, error: action.error };
    case CLEAR_TRACK_DETAILS:
      return { ...state, trackDetails: null };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}