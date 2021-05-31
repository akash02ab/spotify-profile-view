import styled from "styled-components";


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
`;

const Image = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 50%;
`;
const Text = styled.p`
    font-size: 18px;
    color: white;
`;
export default function ArtistsCard(props){

    return(
        <Container>
            <Image src={props.image} />
            <Text>{props.name}</Text>
        </Container>
    )
}