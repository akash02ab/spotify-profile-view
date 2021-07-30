import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/alltimetoptrack.css";

function AllTimeTopTrack() {
	const { topTracks, loading } = useSelector((state) => state.topTrackState);
	const history = useHistory();

	if (loading) return null;

	const getDuration = (ms) => {
		let sec = Math.floor(ms / 1000);
		let min = Math.floor(sec / 60);
		sec = sec - min * 60;
		sec = sec < 10 ? "0" + sec : sec;
		return min + ":" + sec;
	};

	const getAllArtists = (artists) => artists.map((artist) => artist.name).join(", ");

	const clickhandler = () => history.push("/tracks");

	const trackDetails = (detail) => {
		history.push({
			pathname: "/track/detail",
			state: detail,
		});
	};

	return (
		<div className="all-time-top-track">
			<div className="label">
				<h2>Top Tracks of All Time</h2>
				<button onClick={clickhandler}>See More</button>
			</div>

			{topTracks.slice(0, 10).map((track, index) => {
				return (
					<div className="track" key={index} onClick={() => trackDetails(track)}>
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
			})}
		</div>
	);
}

export default AllTimeTopTrack;
