import { combineReducers } from "redux";
import { fetchTokenReducer } from "./fetchTokenReducer";
import { playlistReducer } from "./playlistReducer";
import { recentlyPlayedReducer } from "./recentlyPlayedReducer";
import { topArtistsReducer } from "./topArtistsReducer";
import { topTracksReducer } from "./topTracksReducer";
import { userDataReducer } from "./userDataReducer";

export const rootReducer = combineReducers({
	tokenState: fetchTokenReducer,
	userState: userDataReducer,
	topArtistState: topArtistsReducer,
	topTrackState: topTracksReducer,
	recentlyPlayedState: recentlyPlayedReducer,
	playlistState: playlistReducer,
});
