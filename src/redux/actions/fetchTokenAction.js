import axios from "axios";
import queryString from "query-string";
import { FETCH_TOKEN_ERROR, FETCH_TOKEN_INPROGRESS, FETCH_TOKEN_SUCCESS, SET_CODE } from ".";

export const setCode = (code) => ({
	type: SET_CODE,
	payload: code,
});

const fetchTokenInprogress = () => ({
	type: FETCH_TOKEN_INPROGRESS,
});

const fetchTokenSuccess = (data) => ({
	type: FETCH_TOKEN_SUCCESS,
	payload: data,
});

const fetchTokenError = (error) => ({
	type: FETCH_TOKEN_ERROR,
	error: error,
});

export const getToken = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: { code },
		} = getState();

		const options = {
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			auth: {
				username: process.env.REACT_APP_USERNAME,
				password: process.env.REACT_APP_PASSWORD,
			},
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: queryString.stringify({
				grant_type: "authorization_code",
				code: code,
				// redirect_uri: "https://sleepy-lichterman-b9a815.netlify.app/",
				redirect_uri: "http://localhost:3000/",
			}),
		};

		try {
			dispatch(fetchTokenInprogress());

			let response = await axios.request(options);
			let data = await response;

			dispatch(
				fetchTokenSuccess({ access_token: data.data.access_token, refresh_token: data.data.refresh_token })
			);
		} catch (e) {
			dispatch(fetchTokenError(e.message));
		}
	};
};

export const refreshAccessToken = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: {
				token: { refresh_token },
			},
		} = getState();

		const options = {
			method: "POST",
			url: "https://accounts.spotify.com/api/token",
			auth: {
				username: process.env.REACT_APP_USERNAME,
				password: process.env.REACT_APP_PASSWORD,
			},
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: queryString.stringify({
				grant_type: "refresh_token",
				refresh_token: refresh_token,
			}),
		};

		try {
			// dispatch(fetchTokenInprogress());
			let response = await axios.request(options);
			let data = await response;

			dispatch(fetchTokenSuccess({ access_token: data.data.access_token, refresh_token: refresh_token }));
		} catch (e) {
			dispatch(fetchTokenError(e.message));
		}
	};
};
