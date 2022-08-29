import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleError } from "../utils";
import Loader from "./Loader";
import "../styles/alltimetopartist.css";

function AllTimeTopArtist() {
	const { topArtists, error } = useSelector((state) => state.topArtistState);
	const dispatch = useDispatch();
	const history = useHistory();

	const clickhandler = () => {
		history.push("/artists");
	};

	const artistDetails = (details) => {
		history.push({
			pathname: "/artist/detail",
			state: details,
		});
	};

	if (error) {
		dispatch(handleError(error));
		return <Loader />;
	}

	if (!topArtists) return <Loader />;

	return (
		<div className="all-time-top-artist">
			<div className="label">
				<h2>Top Artists of All Time</h2>
				<button onClick={clickhandler}>See More</button>
			</div>

			{topArtists.slice(0, 10).map((artist, index) => {
				return (
					<div className="artist" key={index} onClick={() => artistDetails(artist)}>
						<img src={artist.images[0].url} alt="artist" />
						<h4>{artist.name}</h4>
					</div>
				);
			})}
		</div>
	);
}

export default AllTimeTopArtist;
