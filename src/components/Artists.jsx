import { useState } from "react";
import { useSelector } from "react-redux";
import ArtistsCard from "./ArtistsCard";
import "../styles/artist.css";

export default function Artists() {
	const { topArtists, topArtistsMonths, topArtistsWeeks } = useSelector((state) => state.topArtistState);
	const [active, setActive] = useState("All");

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
