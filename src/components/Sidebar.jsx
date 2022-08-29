import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { update_path } from "../redux/actions/userDataAction";
import {
	IconSpotify,
	IconUser,
	IconTime,
	IconMicrophone,
	IconPlaylist,
	IconMusic,
	IconGithub,
} from "../icons";
import "../styles/sidebar.css";

function Sidebar() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { path } = useSelector((state) => state.userState);

	const clickhandler = (path) => {
		dispatch(update_path(path));
		history.push(path);
	};

	return (
		<div className="sidebar">
			<div className="spotify-logo" onClick={() => clickhandler("/profile")}>
				<IconSpotify />
			</div>

			<div className="nav-icons">
				<div className={path === "/profile" ? "box active" : "box"} onClick={() => clickhandler("/profile")}>
					<IconUser />
					<p>Profile</p>
				</div>
				<div className={path === "/artists" ? "box active" : "box"} onClick={() => clickhandler("/artists")}>
					<IconMicrophone />
					<p>Artists</p>
				</div>
				<div className={path === "/tracks" ? "box active" : "box"} onClick={() => clickhandler("/tracks")}>
					<IconMusic />
					<p>Tracks</p>
				</div>
				<div className={path === "/recent" ? "box active" : "box"} onClick={() => clickhandler("/recent")}>
					<IconTime />
					<p>Recent</p>
				</div>
				<div className={path === "/playlists" ? "box active" : "box"} onClick={() => clickhandler("/playlists")}>
					<IconPlaylist />
					<p>Playlists</p>
				</div>
			</div>

			<div className="github">
				<a href="https://github.com/akash02ab/spotify-profile-view" target="_blank" rel="noopener noreferrer">
					<IconGithub />
				</a>
			</div>
		</div>
	);
}

export default Sidebar;
