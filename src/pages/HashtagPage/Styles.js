import styled from "styled-components";

export const PageContainer = styled.main`
  display: flex;
  justify-content: center;
  gap: 20px;
  min-height: 100vh;
  width: 100vw;
  background-color: #333333;
`;

export const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #FFFFFF;
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  row-gap: 20px;
  margin-top: 50px;
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 600;
  font-size: 30px;
`;
