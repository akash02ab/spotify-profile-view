import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPlaylists } from "../redux/actions/playlistAction";
import Loader from "./Loader";
import "../styles/playlists.css";
import { handleError } from "../utils";

export default function Playlists() {
	const { playlists, loading, error } = useSelector((state) => state.playlistState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!playlists) {
			dispatch(getPlaylists());
		}
	}, [dispatch, playlists]);

	if (error) {
		handleError(error);
		return <Loader />;
	};

	if (loading || !playlists) return <Loader />

	return (
		<div className="playlist-wrapper">
			<h1>Your Playlists</h1>

			<div className="playlists">
				{playlists.items.map(({ id, images, name, tracks }) => (
					<div className="playlist" key={id}>
						<div className="cover">
							<Link to={`playlist/${id}`}>
								<img src={images[0].url} alt="Album Art" />
							</Link>
						</div>
						<div className="info">
							<Link to={`playlist/${id}`}>{name}</Link>
							<p>{tracks.total} Tracks</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
