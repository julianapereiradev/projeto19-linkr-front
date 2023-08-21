import styled from "styled-components";

export const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #171717;
  border-radius: 15px;
  padding: 15px;
  width: 20%;
  height: 400px;
  margin-top: 82px;
  line-height: 32px;
  @media(max-width: 600px) {
    display: none;
  }
`;

export const Title = styled.p`
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #FFFFFF;
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #484848;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const HashtagsContainer = styled.ul``

export const Hashtag = styled.p`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #FFFFFF;
`;
