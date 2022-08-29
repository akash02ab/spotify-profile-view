import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { REMOVE_TOKEN } from "../redux/actions";
import { handleError } from "../utils";
import { IconUser } from "../icons";
import Loader from "./Loader";
import "../styles/user.css";             

function User() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { user, error } = useSelector((state) => state.userState);

	const clickhandler = () => {
		dispatch({ type: REMOVE_TOKEN });
		localStorage.removeItem("persistantState");
		history.replace("/");
	};

	if (error) {
		dispatch(handleError(error));
		return <Loader />;
	}

	if (!user) return <Loader />;

	const src = user.images[0].url;

	return (
		<div className="user">
			{src ? <img src={src} alt="avatar" /> : <IconUser className="default" />}
			<h1>{user.display_name}</h1>
			<div className="info">
				<div className="follower">
					<p>{user?.followers.total}</p>
					<h5>FOLLOWERS</h5>
				</div>
				<div className="following">
					<p>{user?.following}</p>
					<h5>FOLLOWING</h5>
				</div>
				<div className="playlist">
					<p>{user?.playlist}</p>
					<h5>PLAYLIST</h5>
				</div>
			</div>
			<button onClick={clickhandler}>Logout</button>
		</div>
	);
}

export default User;
