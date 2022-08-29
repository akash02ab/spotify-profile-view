import axios from "axios";
import { CLEAR_PLAYLIST_DETAIL, FETCH_PLAYLIST_DETAIL_ERROR, FETCH_PLAYLIST_DETAIL_INPROGRESS, FETCH_PLAYLIST_DETAIL_SUCCESS } from ".";

const fetchPlaylistDetailInprogress = () => ({
  type: FETCH_PLAYLIST_DETAIL_INPROGRESS
});

const fetchPlaylistDetailSuccess = (data) => ({
  type: FETCH_PLAYLIST_DETAIL_SUCCESS,
  payload: data
});

const fetchPlaylistDetailError = (error) => ({
  type: FETCH_PLAYLIST_DETAIL_ERROR,
  error: error
});

export const clearPlaylistDetail = () => ({
  type: CLEAR_PLAYLIST_DETAIL
});

const getPlaylist = (playlistId, headers) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

const getAudioFeaturesForTracks = (tracks, headers) => {
  const ids = tracks.map(({ track }) => track.id).join(',');
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

export const getPlaylistDetail = (id) => {
  return async function (dispatch, getState) {
    const {
			tokenState: {
				token: { access_token },
			},
    } = getState();
    
    const headers = {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json"
    };

    try {
      dispatch(fetchPlaylistDetailInprogress());
      const response = await getPlaylist(id, headers);
      const playlist = response.data;
      const tracks = playlist.tracks.items;
      const audioFeatures = await (await getAudioFeaturesForTracks(tracks, headers)).data;
      const data = { playlist, audioFeatures };
      dispatch(fetchPlaylistDetailSuccess(data));
    } catch (e) {
      dispatch(fetchPlaylistDetailError(e));
    }
  }
}