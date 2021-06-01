import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import TracksCard from "./TracksCard";

const Container = styled.div`
    height: 100vh;
    width: calc(100% - 5rem);
    margin-left: 5rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    background-color: #353535;
    gap: 20px;
    padding: 30px 50px;
    align-self: flex-end;
    overflow-wrap: break-word;
`;

const Header = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const Heading = styled.h1`
    color: white;
`;

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const List = styled.li`
    color: ${(props) => (props.active ? "white" : "#9e9a9a")};
    list-style-type: none;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`;

const TrackWrapper = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0 50px;
    overflow-y: auto;
`;

export default function Tracks() {
    const { topTracks, topTracksMonths, topTracksWeeks } = useSelector(
        (state) => state.topTrackState
    );
    let [active, setActive] = useState("All");
    let getDuration = (ms) => {
        let sec = ms / 1000;
        let min = 0;
        while (sec >= 60) {
            sec -= 60;
            min++;
        }
        return min + ":" + sec.toFixed(0);
    };

    let getSingers = (arr) => {
        let output = "";
        arr.forEach((e) => {
            if (output !== "") output += ", ";
            output += e.name;
        });
        return output;
    };
    return (
        <MainContainer>
            <Sidebar />
            <Container>
                <Header>
                    <Heading>Tracks</Heading>
                    <Wrapper>
                        <List
                            active={active === "All"}
                            onClick={() => setActive("All")}
                        >
                            All Time
                        </List>
                        <List
                            active={active === "Medium"}
                            onClick={() => setActive("Medium")}
                        >
                            Last 6 Months
                        </List>
                        <List
                            active={active === "Short"}
                            onClick={() => setActive("Short")}
                        >
                            Last 4 Weeks
                        </List>
                    </Wrapper>
                </Header>
                <TrackWrapper>
                    {active === "All"
                        ? topTracks.map((e) => (
                              <TracksCard
                                  title={e.name}
                                  singer={getSingers(e.album.artists)}
                                  img={e.album.images[0].url}
                                  length={getDuration(e.duration_ms)}
                              />
                          ))
                        : active === "Medium"
                        ? topTracksMonths.map((e) => (
                              <TracksCard
                                  title={e.name}
                                  singer={getSingers(e.album.artists)}
                                  img={e.album.images[0].url}
                                  length={getDuration(e.duration_ms)}
                              />
                          ))
                        : topTracksWeeks.map((e) => (
                              <TracksCard
                                  title={e.name}
                                  singer={getSingers(e.album.artists)}
                                  img={e.album.images[0].url}
                                  length={getDuration(e.duration_ms)}
                              />
                          ))}
                </TrackWrapper>
            </Container>
        </MainContainer>
    );
}
