import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    getTopArtist,
    getTopTrack,
    getUserData,
} from "../redux/actions/action";
import Sidebar from "./Sidebar";
import User from "./User";
import AllTimeTopArtist from "./AllTimeTopArtist";
import "../styles/profile.css";
import AllTimeTopTrack from "./AllTimeTopTrack";

function Profile() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
        dispatch(getTopArtist());
        dispatch(getTopTrack());
    }, []);

    return (
        <div className="profile">
            <Sidebar />
            <div className="inner-profile">
                <User />
                <div className="row">
                    <AllTimeTopArtist />
                    <AllTimeTopTrack />
                </div>
            </div>
        </div>
    );
}

export default Profile;
