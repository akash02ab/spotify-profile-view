import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPlaylistDetail, getPlaylistDetail } from "../redux/actions/playlistDetailAction";
import FeatureChart from "./FeatureChart";
import Loader from "./Loader";
import TracksCard from "./TracksCard";
import "../styles/playlistdetail.css";
import { handleError } from "../utils";

function PlaylistDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector((state) => state.playlistDetailState);

  useEffect(() => {
    dispatch(getPlaylistDetail(id));

    return () => dispatch(clearPlaylistDetail());
  }, [id, dispatch]);

  if (error) {
    dispatch(handleError(error));
    return <Loader />;
  }

  if (loading || !details) return <Loader />

  const { playlist, audioFeatures } = details;

  return (
    <div className="playlist-detail-wrapper">
      <div className="left">
        <div className="cover">
          <img src={playlist.images[0].url} alt="Album Art" />
        </div>
        <div className="info">
          <h1>{playlist.name}</h1>
          <p>By {playlist.owner.display_name}</p>
          {playlist.description && <p dangerouslySetInnerHTML={{ __html: playlist.description }}></p>}
          <h5>{playlist.tracks.total} Tracks</h5>
        </div>
        <FeatureChart type="horizontalBar" features={audioFeatures.audio_features} />
      </div>
      <div className="right">
        {
          playlist.tracks.items.map(({ track }, index) => <TracksCard track={track} key={index} />)
        }
      </div>
    </div>
  )
}

export default PlaylistDetail;