import { useState } from "react";
import { useSelector } from "react-redux";
import TracksCard from "./TracksCard";
import "../styles/track.css";

export default function Tracks() {
	const { topTracks, topTracksMonths, topTracksWeeks } = useSelector((state) => state.topTrackState);
	const [active, setActive] = useState("All");

	return (
		<div className="tracks">
			<div className="header">
				<h1>Top Tracks</h1>
				<div className="wrapper">
					<p className={active === "All" ? "active" : ""} onClick={() => setActive("All")}>
						All Time
					</p>
					<p className={active === "Medium" ? "active" : ""} onClick={() => setActive("Medium")}>
						Last 6 Months
					</p>
					<p className={active === "Short" ? "active" : ""} onClick={() => setActive("Short")}>
						Last 4 Weeks
					</p>
				</div>
			</div>

			<div className="track-wrapper">
				{active === "All"
					? topTracks.map((track, index) => <TracksCard track={track} key={index} />)
					: active === "Medium"
					? topTracksMonths.map((track, index) => <TracksCard track={track} key={index} />)
					: topTracksWeeks.map((track, index) => <TracksCard track={track} key={index} />)}
			</div>
		</div>
	);
}
