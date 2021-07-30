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

export const getUserData = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: {
				token: { access_token },
			},
		} = getState();

		try {
			dispatch(fetchUserInprogress());

			let response = await axios.request({
				url: "https://api.spotify.com/v1/me",
				headers: {
					Authorization: "Bearer " + access_token,
				},
			});

			const id = response.data.id;

			let user = await axios.request({
				url: `https://api.spotify.com/v1/users/${id}`,
				headers: {
					Authorization: "Bearer " + access_token,
				},
			});

			dispatch(fetchUserSuccess(user.data));
		} catch (err) {
			dispatch(fetchUserError(err));
		}
	};
};
