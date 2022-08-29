import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopArtist } from "../redux/actions/topArtistAction";
import { handleError } from "../utils";
import ArtistsCard from "./ArtistsCard";
import Loader from "./Loader";
import "../styles/artist.css";

export default function Artists() {
	const { topArtists, topArtistsMonths, topArtistsWeeks, loading, error } = useSelector((state) => state.topArtistState);
	const [active, setActive] = useState("All");
	const dispatch = useDispatch();

	useEffect(() => {
		if (!topArtists) {
			dispatch(getTopArtist());
		}
	}, [dispatch, topArtists]);

	if (error) {
		dispatch(handleError(error));
		return <Loader />;
	}

	if (loading || (active === "All" && !topArtists)) return <Loader />;

	if (loading || (active === "Medium" && !topArtistsMonths)) return <Loader />;

	if (loading || (active === "Short" && !topArtistsWeeks)) return <Loader />;

	return (
		<div className="artists">
			<div className="header">
				<h1>Top Artists</h1>
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

			<div className="artist-wrapper">
				{active === "All"
					? topArtists.map((artist, index) => <ArtistsCard artist={artist} key={index} />)
					: active === "Medium"
					? topArtistsMonths.map((artist, index) => <ArtistsCard artist={artist} key={index} />)
					: topArtistsWeeks.map((artist, index) => <ArtistsCard artist={artist} key={index} />)}
			</div>
		</div>
	);
}
