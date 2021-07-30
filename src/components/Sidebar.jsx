import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { update_path } from "../redux/actions/userDataAction";
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
			<div className="spotify-logo">
				<img src="../assets/icons/spotify-brands.svg" alt="logo" />
			</div>

			<div className="nav-icons">
				<div className={path === "/profile" ? "box active" : "box"} onClick={() => clickhandler("/profile")}>
					<img src="../assets/icons/user-solid.svg" alt="user" />
				</div>
				<div className={path === "/artists" ? "box active" : "box"} onClick={() => clickhandler("/artists")}>
					<img src="../assets/icons/microphone-solid.svg" alt="mic" />
				</div>
				<div className={path === "/tracks" ? "box active" : "box"} onClick={() => clickhandler("/tracks")}>
					<img src="../assets/icons/music-solid.svg" alt="music" />
				</div>
				<div className={path === "/recent" ? "box active" : "box"} onClick={() => clickhandler("/recent")}>
					<img src="../assets/icons/redo-alt-solid.svg" alt="recent" />
				</div>
				<div className={path === "/playlist" ? "box active" : "box"} onClick={() => clickhandler("/playlist")}>
					<img src="../assets/icons/playlist.svg" alt="playlist" />
				</div>
			</div>

			<div className="github">
				<img src="../assets/icons/github.svg" alt="github" />
			</div>
		</div>
	);
}

export default Sidebar;
