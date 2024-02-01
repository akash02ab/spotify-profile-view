import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken, setCode } from "../redux/actions/fetchTokenAction";
import "../styles/login.css";

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = encodeURIComponent("https://spotify-profile-views.netlify.app/");
// const redirectUri = encodeURIComponent("http://localhost:3000/");
const clientId = "d45167963940408e8732302c867374d5";

const scopes = [
	"user-read-private",
	"user-read-email",
	"user-read-recently-played",
	"user-top-read",
	"user-follow-read",
	"user-follow-modify",
	"user-read-currently-playing",
	"user-read-playback-state",
	"user-modify-playback-state",
	"playlist-read-private",
	"playlist-read-collaborative",
	"playlist-modify-public"
];

const URL = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
	"%20"
)}&show_dialog=true`;

function Login() {
	let history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.tokenState.token);

	const login = () => {
		window.location.replace(URL);
	};

	useEffect(() => {
		if (token) {
			history.push({ pathname: "/profile" });
			return;
		}

		try {
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const code = urlParams.get("code");

			if (code) {
				dispatch(setCode(code));
				dispatch(getToken());
			}
		} catch (err) {
			console.error(err);
		}
	}, [dispatch, history, token]);

	return (
		<div className="login">
			<h2>Spotify Profile</h2>
			<button onClick={login} className="l-btn">LOGIN INTO SPOTIFY</button>
			<div>
				<p>Spotify has introduced <span>Quota extenstion</span> for the project that are in development mode, thus they will <span>not</span> grant a quota extension for home automation, school, or <span>hobby projects</span>. This application can only be logged in by atmost <span>25 users</span> whose <u><span>user name &amp; email</span> is present in my spotify dashboard under user mangagement</u>.</p>
				<p>Please visit the github repository to view the screenshot.</p>
			</div>
			<a href="https://github.com/akash02ab/spotify-profile-view">View Screenshots</a>
		</div>
	);
}

export default Login;
