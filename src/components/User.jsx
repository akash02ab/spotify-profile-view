import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { REMOVE_TOKEN } from "../redux/actions";
import "../styles/user.css";

function User() {
    const { user, loading,error } = useSelector((state) => state.userState);
    const history = useHistory();
    const dispatch = useDispatch();

    const clickhandler = () => {
        localStorage.setItem("persistantState", null);
        dispatch({type: REMOVE_TOKEN});
        history.push("/");
    };

    if (loading||error) return null;

    const alt = "../assets/icons/user-solid.svg";
    const src = user.images[0].url || alt;

    return (
        <div className="user">
            <img src={src} className={src === alt ? "default" : ""} alt="" />
            <h1>{user.display_name}</h1>
            <div className="info">
                <div className="follower">
                    <p>{user.followers.total}</p>
                    <h5>FOLLOWERS</h5>
                </div>
                <div className="following">
                    <p>{Math.floor(Math.random() * 30)}</p>
                    <h5>FOLLOWING</h5>
                </div>
                <div className="playlist">
                    <p>{Math.floor(Math.random() * 10)}</p>
                    <h5>PLAYLIST</h5>
                </div>
            </div>
            <button onClick={clickhandler}>Logout</button>
        </div>
    );
}

export default User;
