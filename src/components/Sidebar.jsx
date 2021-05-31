import "../styles/sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="spotify-logo">
                <div className="box">
                    <img src="../assets/icons/spotify-brands.svg" alt="logo" />
                </div>
            </div>

            <div className="nav-icons">
                <div className="box">
                    <img src="../assets/icons/user-solid.svg" alt="user" />
                </div>
                <div className="box">
                    <img src="../assets/icons/microphone-solid.svg" alt="mic" />
                </div>
                <div className="box">
                    <img src="../assets/icons/music-solid.svg" alt="music" />
                </div>
                <div className="box">
                    <img src="../assets/icons/redo-alt-solid.svg" alt="replay" />
                </div>
                <div className="box">
                    <img src="../assets/icons/playlist.svg" alt="playlist" />
                </div>
            </div>

            <div className="github">
                <div className="box">
                    <img src="../assets/icons/github.svg" alt="github" />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
