import { useLocation } from "react-router-dom";
import "../styles/artistdetail.css";

export default function ArtistDetail() {
	const location = useLocation();
	const artist = location.state;

	return (
		<div className="artist-detail">
			<img src={artist.images[0].url} alt="profile-pic" />
			<h1>{artist.name}</h1>
			<div className="details">
				<div className="col">
					<h4>FOLLOWERS</h4>
					<h3>{artist.followers.total}</h3>
				</div>
				<div className="col">
					<h4>GENERES</h4>
					{artist.genres.map((genre, index) => (
						<h3 key={index}>{genre}</h3>
					))}
				</div>
				<div className="col">
					<h4>POPULARITY</h4>
					<h3>{artist.popularity}%</h3>
				</div>
			</div>
		</div>
	);
}
