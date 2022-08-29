import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleError } from "../utils";
import TracksCard from "./TracksCard";
import Loader from "./Loader";
import "../styles/alltimetoptrack.css";

function AllTimeTopTrack() {
	const { topTracks, error } = useSelector((state) => state.topTrackState);
	const dispatch = useDispatch();
	const history = useHistory();

	const clickhandler = () => history.push("/tracks");

	if (error) {
		dispatch(handleError(error));
		return <Loader />
	}

	if (!topTracks) return <Loader />;

	return (
		<div className="all-time-top-track">
			<div className="label">
				<h2>Top Tracks of All Time</h2>
				<button onClick={clickhandler}>See More</button>
			</div>

			{topTracks.slice(0, 10).map((track, index) => {
				return (
					<TracksCard track={track} key={index} />
				);
			})}
		</div>
	);
}

export default AllTimeTopTrack;
