import axios from "axios";
import { CLEAR_TRACK_DETAILS, FETCH_TRACK_DETAILS_ERROR, FETCH_TRACK_DETAILS_INPROGRESS, FETCH_TRACK_DETAILS_SUCCESS } from ".";

const fetchTrackDetailsInprogress = () => ({
  type: FETCH_TRACK_DETAILS_INPROGRESS
});

const fetchTrackDetailsSuccess = (data) => ({
  type: FETCH_TRACK_DETAILS_SUCCESS,
  payload: data
});

const fetchTrackDetailsError = (error) => ({
  type: FETCH_TRACK_DETAILS_ERROR,
  error: error
});

export const clearTrackDetails = () => ({
  type: CLEAR_TRACK_DETAILS
});

const getTrack = (trackId, headers) => axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

const getTrackAudioAnalysis = (trackId, headers) => axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });

const getTrackAudioFeatures = (trackId, headers) => axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });

export const getTrackDetails = (trackId) => {
  return async function (dispatch, getState) {
    const {
      tokenState: {
        token: { access_token }
      }
    } = getState();

    const headers = {
			Authorization: `Bearer ${access_token}`,
			"Content-Type": "application/json"
		};
  
    try {
      dispatch(fetchTrackDetailsInprogress());
      const response = await axios.all([
        getTrack(trackId, headers),
        getTrackAudioAnalysis(trackId, headers),
        getTrackAudioFeatures(trackId, headers)
      ]);
      const data = {
        track: response[0].data,
        analysis: response[1].data,
        features: response[2].data
      }
      dispatch(fetchTrackDetailsSuccess(data));
    } catch (e) {
      dispatch(fetchTrackDetailsError(e));
    }
  }
}