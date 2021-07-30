import axios from "axios";
import { FETCH_TOP_ARTIST_ERROR, FETCH_TOP_ARTIST_INPROGRESS, FETCH_TOP_ARTIST_SUCCESS } from ".";

const fetchTopArtistInprogress = () => ({
	type: FETCH_TOP_ARTIST_INPROGRESS,
});

const fetchTopArtistSuccess = (data) => ({
	type: FETCH_TOP_ARTIST_SUCCESS,
	payload: data,
});

const fetchTopArtistError = (error) => ({
	type: FETCH_TOP_ARTIST_ERROR,
	error: error,
});

export const getTopArtist = () => {
	return async function (dispatch, getState) {
		const {
			tokenState: {
				token: { access_token },
			},
		} = getState();

		let terms = ["long_term", "medium_term", "short_term"];

		let getOptions = (term) => {
			return {
				method: "GET",
				url: "https://api.spotify.com/v1/me/top/artists?time_range=" + term,
				headers: {
					Authorization: "Bearer " + access_token,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			};
		};

		try {
			dispatch(fetchTopArtistInprogress());
			let data = { alltime: [], months: [], weeks: [] };

			let alltimeResponse = await axios.request(getOptions(terms[0]));
			let alltimeData = await alltimeResponse.data;
			data.alltime = alltimeData.items;

			let mediumResponse = await axios.request(getOptions(terms[1]));
			let mediumData = await mediumResponse.data;
			data.months = mediumData.items;

			let shortResponse = await axios.request(getOptions(terms[2]));
			let shortData = await shortResponse.data;
			data.weeks = shortData.items;

			dispatch(fetchTopArtistSuccess(data));
		} catch (err) {
			dispatch(fetchTopArtistError(err));
		}
	};
};
