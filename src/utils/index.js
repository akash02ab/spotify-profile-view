import { CLEAR_ERROR } from "../redux/actions";
import { refreshAccessToken } from "../redux/actions/fetchTokenAction";

export const handleError = (error) => {
  return async function (dispatch, getState) {
		if (error && error.response && error.response.status === 401) {
			dispatch(refreshAccessToken());
		} else {
			console.error(error.message);
		}

		dispatch({ type: CLEAR_ERROR });
  }
}

export const parseDuration = (ms) => {
	let sec = Math.floor(ms / 1000);
	let min = Math.floor(sec / 60);
	sec = sec - min * 60;
	sec = sec < 10 ? "0" + sec : sec;
	return min + ":" + sec;
};

export const parsePitchClass = note => {
	let key = note;

	switch (note) {
		case 0:
			key = 'C';
			break;
		case 1:
			key = 'D♭';
			break;
		case 2:
			key = 'D';
			break;
		case 3:
			key = 'E♭';
			break;
		case 4:
			key = 'E';
			break;
		case 5:
			key = 'F';
			break;
		case 6:
			key = 'G♭';
			break;
		case 7:
			key = 'G';
			break;
		case 8:
			key = 'A♭';
			break;
		case 9:
			key = 'A';
			break;
		case 10:
			key = 'B♭';
			break;
		case 11:
			key = 'B';
			break;
		default:
			return null;
	}

	return key;
};