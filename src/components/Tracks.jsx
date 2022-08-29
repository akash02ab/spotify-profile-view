import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopTrack } from "../redux/actions/topTrackAction";
import { handleError } from "../utils";
import TracksCard from "./TracksCard";
import Loader from "./Loader";
import "../styles/track.css";

export default function Tracks() {
	const dispatch = useDispatch();
	const [active, setActive] = useState("All");
	const { topTracks, topTracksMonths, topTracksWeeks, loading, error } = useSelector((state) => state.topTrackState);

	useEffect(() => {
		if (!topTracks) {
			dispatch(getTopTrack())
		}
	}, [dispatch, topTracks]);

	if (error) {
		handleError(error);
		return <Loader />;
	}

	if (loading || !topTracks) return <Loader />;

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
