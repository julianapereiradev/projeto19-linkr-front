import { useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import styled from "styled-components"

export default function Header() {
  const [image, setImage] = useState("https://img.freepik.com/free-icon/user_318-644324.jpg");

  return (
    <HeaderContainer>
      <Title>linkr</Title>
      <RightContainer>
        <BiSolidChevronDown color="#FFFFFF" size="50"/>
        <img src={image} />
      </RightContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #FFFFFF;
  font-size: 50px;
  font-family: 'Passion One', cursive;
  font-weight: 700;
  margin-left: 30px;
`;

const RightContainer = styled.div`
  margin-right: 30px;
  img {
    height: 50px;
  }
`