import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/userDataAction";
import { getTopArtist } from "../redux/actions/topArtistAction";
import { getTopTrack } from "../redux/actions/topTrackAction";
import { getRecentlyPlayed } from "../redux/actions/recentlyPlayedAction";
import { getPlaylist } from "../redux/actions/playlistAction";
import Login from "./Login";
import Profile from "./Profile";
import Artists from "./Artists";
import Tracks from "./Tracks";
import ArtistDetail from "./ArtistDetail";
import TrackDetail from "./TrackDetail";
import RecentlyPlayed from "./RecentlyPlayed";
import Playlist from "./Playlist";

export default function Main({ children }) {
	const { token } = useSelector((state) => state.tokenState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(getUserData());
			dispatch(getTopArtist());
			dispatch(getTopTrack());
			dispatch(getRecentlyPlayed());
			dispatch(getPlaylist());
		}
		// eslint-disable-next-line
	}, [token]);

	return (
		<Router>
			{token && children}
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/profile" component={Profile} />
				<Route path="/artists" component={Artists} />
				<Route path="/artist/detail" component={ArtistDetail} />
				<Route path="/tracks" component={Tracks} />
				<Route path="/track/detail" component={TrackDetail} />
				<Route path="/recent" component={RecentlyPlayed} />
				<Route path="/playlist" component={Playlist} />
			</Switch>
		</Router>
	);
}
