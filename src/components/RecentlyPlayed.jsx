import { useSelector } from "react-redux";
import TracksCard from "./TracksCard";
import "../styles/recentlyplayed.css";

export default function RecentlyPlayed() {
	const { recentlyPlayed } = useSelector((state) => state.recentlyPlayedState);
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
