import axios from "axios";
import { FETCH_USER_ERROR, FETCH_USER_INPROGRESS, FETCH_USER_SUCCESS, UPDATE_PATH } from ".";

export const update_path = (path) => ({
	type: UPDATE_PATH,
	payload: path,
});

const fetchUserInprogress = () => ({
	type: FETCH_USER_INPROGRESS,
});

const fetchUserSuccess = (data) => ({
	type: FETCH_USER_SUCCESS,
	payload: data,
});

const fetchUserError = (error) => ({
	type: FETCH_USER_ERROR,
	error: error,
});

const getUser = (headers) => axios.get('https://api.spotify.com/v1/me', { headers });

const getFollowing = (headers) => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

const getPlaylists = (headers) => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getUserData = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: {
				token: { access_token },
			},
		} = getState();

		const headers = {
			Authorization: `Bearer ${access_token}`,
			"Content-Type": "application/json"
		};

		try {
			dispatch(fetchUserInprogress());

			let response = await axios.all([
				getUser(headers),
				getFollowing(headers),
				getPlaylists(headers),
			]);

			let data = {
				...response[0].data,
				following: response[1].data.artists.total,
				playlist: response[2].data.total
			};
			
			dispatch(fetchUserSuccess(data));
		} catch (err) {
			dispatch(fetchUserError(err));
		}
	};
};
