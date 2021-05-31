import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ArtistsCard from "./ArtistsCard";
import Sidebar from "./Sidebar";


const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;
const Container = styled.div`
  height: 100%;
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

const ArtistWrapper = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 50px;
    overflow-y: auto;
    padding: 0 50px;
`;

const List = styled.li`
  color: ${props=>props.active?"white":"#9e9a9a"};
  list-style-type:none;
  cursor: pointer;
  &:hover{
    color: white;
  }
`;
export default function Artists(){
    const {topArtists, topArtistsMonths, topArtistsWeeks} = useSelector(state=>state.topArtistState)
    let [active,setActive] = useState("All")
    return(
      <MainContainer>
        <Sidebar/>
        <Container>
            <Header>
                <Heading>Top Personal Tracks</Heading>
                <Wrapper>
                    <List active={active==="All"} onClick={()=>setActive("All")}>All Time</List>
                    <List active={active==="Medium"} onClick={()=>setActive("Medium")}>Last 6 Months</List>
                    <List active={active==="Short"} onClick={()=>setActive("Short")}>Last 4 Weeks</List>
                </Wrapper>
            </Header>
            <ArtistWrapper>
            {
              active==="All"? topArtists.map(e=><ArtistsCard name={e.name} image={e.images[0].url} />)
              :active==="Medium"? topArtistsMonths.map(e=><ArtistsCard name={e.name} image={e.images[0].url} />)
              :topArtistsWeeks.map(e=><ArtistsCard name={e.name} image={e.images[0].url} />)
            }
            </ArtistWrapper>
        </Container>

        </MainContainer>
    )
}