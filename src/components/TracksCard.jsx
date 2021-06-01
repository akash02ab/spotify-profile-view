import styled from "styled-components"

const Container = styled.div`
    display: flex;
    gap: 30px;
    width: 100%;
    height: fit-content;
    padding: 5px 10px;
    border: 3px solid transparent;
    &:hover{
        border-color: white;
    }
`;

const TextContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const Image = styled.img`
    height: 50px;
    width: 50px;
`;

const Text = styled.p`
    font-size: 14px;
    color: ${props=>props.artist?"#9e9e9e":"white"};
    align-self: ${props=>props.time?"center":""};
`;

export default function TracksCard(props){
    return(
        <Container>
            <Image  src={props.img}/>
            <TextContainer>
                <Text>{props.title}</Text>
                <Text>{props.singer}</Text>
            </TextContainer>
            <Text artist={true} time={true}>{props.length} </Text>
        </Container>
    )
}