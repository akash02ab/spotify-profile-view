import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken, setCode } from "../redux/actions/action";
import "../styles/login.css";

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = encodeURIComponent("http://localhost:3000/");
const clientId = "d45167963940408e8732302c867374d5";
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

const URL = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&show_dialog=true`;

function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector(state => state.tokenState.token);

    const login = () => {
        window.location.replace(URL);
    };

    useEffect(() => {
        if(token) {
            history.push({pathname: "/profile"});
            return;
        }

        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get("code");
            
            if(code) {
                dispatch(setCode(code));
                dispatch(getToken());
            }
        } catch (err) {
            console.error(err);
        }
    }, [token]);

    return (
        <div className="container">
            <h2>Spotify Profile</h2>
            <button onClick={login}>LOGIN INTO SPOTIFY</button>
        </div>
    );
}

export default Login;
