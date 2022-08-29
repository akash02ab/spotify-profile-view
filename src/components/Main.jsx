import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshAccessToken } from "../redux/actions/fetchTokenAction";
import Login from "./Login";
import Profile from "./Profile";
import Artists from "./Artists";
import Tracks from "./Tracks";
import ArtistDetail from "./ArtistDetail";
import TrackDetail from "./TrackDetail";
import RecentlyPlayed from "./RecentlyPlayed";
import Playlists from "./Playlists";
import PlaylistDetail from "./PlaylistDetail";
import Loader from "./Loader";

export default function Main({ children }) {
	const dispatch = useDispatch();
	const { token, error } = useSelector((state) => state.tokenState);

	if (error) {
		dispatch(refreshAccessToken());
		window.location.reload();
		return <Loader />
	}

	return (
		<Router>
			{token && children}
			<div className="main-wrapper">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/profile" component={Profile} />
					<Route path="/artists" component={Artists} />
					<Route path="/artist/detail" component={ArtistDetail} />
					<Route path="/tracks" component={Tracks} />
					<Route path="/track/:id" component={TrackDetail} />
					<Route path="/recent" component={RecentlyPlayed} />
					<Route path="/playlists" component={Playlists} />
					<Route path="/playlist/:id" component={PlaylistDetail} />
				</Switch>
			</div>
		</Router>
	);
}
