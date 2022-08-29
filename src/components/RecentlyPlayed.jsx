import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecentlyPlayed } from "../redux/actions/recentlyPlayedAction";
import { handleError } from "../utils";
import TracksCard from "./TracksCard";
import Loader from "./Loader";
import "../styles/recentlyplayed.css";

export default function RecentlyPlayed() {
	const { recentlyPlayed, loading, error } = useSelector((state) => state.recentlyPlayedState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!recentlyPlayed || recentlyPlayed.length === 0) {
			dispatch(getRecentlyPlayed());
		}
	}, [dispatch, recentlyPlayed]);

	if (error) {
		dispatch(handleError(error));
		return <Loader />;
	}

	if (!recentlyPlayed || loading) return <Loader />;

	return (
		<div className="recently-played">
			<div className="track-wrapper">
				<h1>Recently Played Tracks</h1>
				{recentlyPlayed.map(({ track }, index) => (
					<TracksCard track={track} key={index} />
				))}
			</div>
		</div>
	);
}
