import axios from "axios";
import { FETCH_PLAYLIST_ERROR, FETCH_PLAYLIST_INPROGRESS, FETCH_PLAYLIST_SUCCESS } from ".";

const fetchPlaylistInProgress = () => ({
	type: FETCH_PLAYLIST_INPROGRESS,
});

const fetchPlaylistSuccess = (data) => ({
	type: FETCH_PLAYLIST_SUCCESS,
	payload: data,
});

const fetchPlaylistError = (error) => ({
	type: FETCH_PLAYLIST_ERROR,
	error: error,
});

export const getPlaylists = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: {
				token: { access_token },
			},
		} = getState();

		const header = {
			method: "GET",
			url: "https://api.spotify.com/v1/me/playlists",
			headers: {
				Authorization: "Bearer " + access_token,
				"Content-Type": "application/json"
			},
		};

		try {
			dispatch(fetchPlaylistInProgress());
			const response = await axios.request(header);
			const data = await response.data;
			dispatch(fetchPlaylistSuccess(data));
		} catch (err) {
			dispatch(fetchPlaylistError(err));
		}
	};
};