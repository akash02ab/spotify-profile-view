import { Link } from "react-router-dom";
import { parseDuration } from "../utils";

export default function TracksCard({ track }) {
	const getAllArtists = (artists) => artists.map((artist) => artist.name).join(", ");

	return (
		<Link to={`/track/${track.id}`}>
			<div className="track">
				<div className="track-left">
					<img src={track.album.images[0].url} alt="track" />
				</div>
				<div className="track-right">
					<div className="info">
						<h4>{track.name}</h4>
						<p>{getAllArtists(track.artists)}</p>
					</div>
					<div className="duration">
						{parseDuration(track.duration_ms)}
					</div>
				</div>
			</div>
		</Link>
	);
}
