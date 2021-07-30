import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/trackdetail.css";

const getDuration = (ms) => {
	let sec = Math.floor(ms / 1000);
	let min = Math.floor(sec / 60);
	sec = sec - min * 60;
	sec = sec < 10 ? "0" + sec : sec;
	return min + ":" + sec;
};

function TrackDetail() {
	const location = useLocation();
	const track = location.state;

	return (
		<div className="track-detail">
			<div className="detail">
				<img src={track.album.images[0].url} alt="album-art" />
				<div className="about">
					<h1>{track.name}</h1>
					<h2>{track.album.artists.map((artist, index) => artist.name).join(", ")}</h2>
					<p>
						{track.album.name} , {track.album.release_date.split("-")[0]}
					</p>
					<a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
						Play on Spotify
					</a>
				</div>
			</div>

			<div className="info">
				<div className="col">
					<h2>Disc Number</h2>
					<p>{track.disc_number}</p>
				</div>
				<div className="col">
					<h2>Track Number</h2>
					<p>{track.track_number}</p>
				</div>
				<div className="col">
					<h2>Total Track</h2>
					<p>{track.album.total_tracks}</p>
				</div>
				<div className="col">
					<h2>Duration</h2>
					<p>{getDuration(track.duration_ms)}</p>
				</div>
				<div className="col">
					<h2>Popularity</h2>
					<p>{track.popularity}%</p>
				</div>
			</div>
		</div>
	);
}

export default TrackDetail;
