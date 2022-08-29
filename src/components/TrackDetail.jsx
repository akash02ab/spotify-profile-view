import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearTrackDetails, getTrackDetails } from "../redux/actions/trackDetailAction";
import { handleError, parseDuration, parsePitchClass } from "../utils";
import Loader from "./Loader";
import FeatureChart from "./FeatureChart";
import "../styles/trackdetail.css";

function TrackDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { trackDetails, loading, error } = useSelector((state) => state.trackDetailState);

	useEffect(() => {
		dispatch(getTrackDetails(id));

		return () => dispatch(clearTrackDetails());
	}, [id, dispatch]);

	if (error) {
		dispatch(handleError(error));
		return <Loader />;
	}

	if (!trackDetails || loading) return <Loader />;

	const { track, analysis, features } = trackDetails;

	return (
		<div className="track-detail">
			<div className="detail">
				<img src={track?.album?.images[0].url} alt="album-art" />
				<div className="about">
					<h1>{track?.name}</h1>
					<h2>{track?.album?.artists.map((artist, index) => artist.name).join(", ")}</h2>
					<p>
						{track?.album?.name} , {track?.album?.release_date.split("-")[0]}
					</p>
					<a href={track?.external_urls?.spotify} target="_blank" rel="noreferrer">
						Play on Spotify
					</a>
				</div>
			</div>

			<div className="info">
				<div className="col">
					<h2>{parseDuration(features?.duration_ms)}</h2>
					<p>Duration</p>
				</div>
				<div className="col">
					<h2>{parsePitchClass(features?.key)}</h2>
					<p>Key</p>
				</div>
				<div className="col">
					<h2>{features?.mode === 1 ? 'Major' : 'Minor'}</h2>
					<p>Modality</p>
				</div>
				<div className="col">
					<h2>{features?.time_signature}</h2>
					<p>Time Signature</p>
				</div>
				<div className="col">
					<h2>{Math.round(features?.tempo)}</h2>
					<p>Tempo (BPM)</p>
				</div>
				<div className="col">
					<h2>{track?.popularity}%</h2>
					<p>Popularity</p>
				</div>
				<div className="col">
					<h2>{analysis?.bars?.length}</h2>
					<p>Bars</p>
				</div>
				<div className="col">
					<h2>{analysis?.beats?.length}</h2>
					<p>Beats</p>
				</div>
				<div className="col">
					<h2>{analysis?.sections?.length}</h2>
					<p>Sections</p>
				</div>
				<div className="col">
					<h2>{analysis?.segments?.length}</h2>
					<p>Segments</p>
				</div>
			</div>

			{features && <FeatureChart type='' features={features} />}
		</div>
	);
}

export default TrackDetail;
