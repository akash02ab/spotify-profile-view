import User from "./User";
import AllTimeTopArtist from "./AllTimeTopArtist";
import AllTimeTopTrack from "./AllTimeTopTrack";
import "../styles/profile.css";

function Profile() {
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
