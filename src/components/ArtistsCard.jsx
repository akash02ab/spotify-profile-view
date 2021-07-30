import { useHistory } from "react-router-dom";

export default function ArtistsCard({ artist }) {
	const history = useHistory();

	const clickhandler = () => {
		history.push({
			pathname: "/artist/detail",
			state: artist,
		});
	};

	return (
		<div className="artist-card" onClick={clickhandler}>
			<img src={artist.images[0].url} alt="profile-pic" />
			<p>{artist.name}</p>
		</div>
	);
}
