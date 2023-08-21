import styled from "styled-components";

export const ColorText = styled.h1`
    color: #ffffff;
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
`;
export const ContainerTimeline = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: -50px;
`;
export const ContainerPost = styled.div`
    width: 611px;
    height:100vh;
    margin-top: 78px;
    @media(max-width: 625px) {
        width: 100%;
    }
`