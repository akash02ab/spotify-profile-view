import { useSelector } from "react-redux";
import "../styles/alltimetopartist.css";

function AllTimeTopArtist() {
    const { topArtists, loading } = useSelector((state) => state.topArtistState);

    if(loading) return null;

    return (
        <div className="all-time-top-artist">
            <div className="label">
                <h2>Top Artists of All Time</h2>
                <button>See More</button>
            </div>
            
            {topArtists.map((artist, index) => {
                return (
                    <div className="artist" key={index}>
                        <img src={artist.images[0].url}  alt="artist" />
                        <h4>{artist.name}</h4>
                    </div>
                );
            })}
        </div>
    );
}

export default AllTimeTopArtist;
