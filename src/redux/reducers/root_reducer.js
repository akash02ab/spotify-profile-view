import { combineReducers } from "redux";
import { fetchTokenReducer } from "./fetchTokenReducer";
import { playlistReducer } from "./playlistReducer";
import { recentlyPlayedReducer } from "./recentlyPlayedReducer";
import { topArtistsReducer } from "./topArtistsReducer";
import { topTracksReducer } from "./topTracksReducer";
import { userDataReducer } from "./userDataReducer";
import { trackDetailsReducer } from "./trackDetailsReducer";
import { playlistDetailReducer } from "./playlistDetailReducer";
import { REMOVE_TOKEN } from "../actions";

export const allReducers = combineReducers({
	tokenState: fetchTokenReducer,
	userState: userDataReducer,
	topArtistState: topArtistsReducer,
	topTrackState: topTracksReducer,
	recentlyPlayedState: recentlyPlayedReducer,
	playlistState: playlistReducer,
	trackDetailState: trackDetailsReducer,
	playlistDetailState: playlistDetailReducer
});

export const rootReducer = (state, action) => {
	if (action.type === REMOVE_TOKEN) {
		state = undefined;
	}

	return allReducers(state, action);
}