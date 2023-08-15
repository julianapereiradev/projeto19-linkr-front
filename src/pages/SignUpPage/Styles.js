import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const LeftContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #151515;
  color: #FFFFFF;
  box-shadow: 10px 10px 15px -9px rgba(0,0,0,0.68);

  @media (min-width: 768px) {
     align-items: flex-start;
     padding: 0px 100px;
  }
 

  h1 {
    font-size: 76px;
    font-weight: bold;
    font-family: 'Passion One', cursive;
    letter-spacing: 5px;

    @media (min-width: 768px) {
      font-size: 106px;
  }
  }

  h2 {
    font-size: 23px;
    font-weight: bold;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 10px;

    @media (min-width: 768px) {
      font-size: 43px;
  }
  }

  @media (min-width: 768px) {
    flex: 7;
  }
`;

export const RightContent = styled.div`
  flex: 8;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 50px;
  padding-bottom: 50px;

  @media (min-width: 768px) {
    flex: 3;
    align-self: center;
    padding-left: 50px;
    padding-right: 50px;
  }
`;

export const SignUpForm = styled.form`
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    height: 55px;
  }
`;

export const LinkToSignIn = styled(Link)`
  color: #FFFFFF;
  text-decoration: underline;
  font-size: 17px;
  font-family: 'Lato', sans-serif;
  margin-top: 20px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

