import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/actions/userDataAction";
import { getTopTrack } from "../redux/actions/topTrackAction";
import { getTopArtist } from "../redux/actions/topArtistAction";
import User from "./User";
import AllTimeTopArtist from "./AllTimeTopArtist";
import AllTimeTopTrack from "./AllTimeTopTrack";
import Loader from "./Loader";
import "../styles/profile.css";

function Profile() {
	const dispatch = useDispatch();
	const { user, loading: l1 } = useSelector((state) => state.userState);
	const { topTracks, loading: l2 } = useSelector((state) => state.topTrackState);
	const { topArtists, loading: l3 } = useSelector((state) => state.topArtistState);

	useEffect(() => {
		if (!user) dispatch(getUserData());
		if (!topTracks) dispatch(getTopTrack());
		if (!topArtists) dispatch(getTopArtist());
	}, [dispatch, user, topTracks, topArtists]);

	if (l1 || l2 || l3) return <Loader />;

	return (
		<div className="profile">
			<User />

			<div className="row">
				<AllTimeTopArtist />
				<AllTimeTopTrack />
			</div>
		</div>
	);
}

export default Profile;
