import { useHistory } from "react-router-dom";

const getDuration = (ms) => {
	let sec = Math.floor(ms / 1000);
	let min = Math.floor(sec / 60);
	sec = sec - min * 60;
	sec = sec < 10 ? "0" + sec : sec;
	return min + ":" + sec;
};

export default function TracksCard({ track }) {
	const history = useHistory();

	const getAllArtists = (artists) => artists.map((artist) => artist.name).join(", ");

	const trackDetails = (detail) => {
		history.push({
			pathname: "/track/detail",
			state: detail,
		});
	};

	return (
		<div className="track" onClick={() => trackDetails(track)}>
			<div className="track-left">
				<img src={track.album.images[0].url} alt="track" />

				<div className="info">
					<h4>{track.name}</h4>
					<p>{getAllArtists(track.artists)}</p>
				</div>
			</div>

			<div className="track-right">{getDuration(track.duration_ms)}</div>
		</div>
	);
}
