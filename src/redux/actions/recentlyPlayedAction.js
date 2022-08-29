import axios from "axios";
import { FETCH_RECENTLY_PLAYED_ERROR, FETCH_RECENTLY_PLAYED_INPROGRESS, FETCH_RECENTLY_PLAYED_SUCCESS } from ".";

const recentlyPlayedInProgress = () => ({
	type: FETCH_RECENTLY_PLAYED_INPROGRESS,
});

const recentlyPlayedSuccess = (data) => ({
	type: FETCH_RECENTLY_PLAYED_SUCCESS,
	payload: data,
});

const recentlyPlayedError = (error) => ({
	type: FETCH_RECENTLY_PLAYED_ERROR,
	error: error,
});

export const getRecentlyPlayed = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: {
				token: { access_token },
			},
		} = getState();

		const header = {
			method: "GET",
			url: "https://api.spotify.com/v1/me/player/recently-played",
			headers: {
				Authorization: "Bearer " + access_token,
				"Content-Type": "application/json"
			},
		};

		try {
			dispatch(recentlyPlayedInProgress());
			const response = await axios.request(header);
			const data = await response.data;
			console.log(data)
			dispatch(recentlyPlayedSuccess(data.items));
		} catch (err) {
			dispatch(recentlyPlayedError(err));
		}
	};
};
