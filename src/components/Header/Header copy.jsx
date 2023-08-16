import { useEffect, useState } from "react";
// import { BiSolidChevronDown } from "react-icons/bi";
import styled from "styled-components"

export default function Header() {
  // const [image, setImage] = useState("https://img.freepik.com/free-icon/user_318-644324.jpg");

  const [showLogout, setShowLogout] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLogout && !event.target.closest(".header-box")) {
        setShowLogout(false);
        setArrowDirection("down");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
    setArrowDirection(showLogout === true ? "down" : "up");
  };

  return (
    // <HeaderContainer>
    //   <Title>linkr</Title>
    //   <RightContainer>
    //     <BiSolidChevronDown color="#FFFFFF" size="50"/>
    //     <img src={image} />
    //   </RightContainer>
    // </HeaderContainer>
    <>
    <HeaderBox className="header-box">
        <HeaderContent>
          <HeaderText onClick={toggleLogout}>
            Foto
          </HeaderText>
          <Arrow onClick={toggleLogout}>
            {arrowDirection === "down" ? "↓" : "↑"}
          </Arrow>
        </HeaderContent>
      </HeaderBox>

      {showLogout && <LogoutSection>Logout</LogoutSection>}
    </>
  )
}

const HeaderBox = styled.div`
  width: 100%;
  background-color: #87f82a;
  color: white;
  padding: 20px;
  text-align: center;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const HeaderText = styled.span`
  margin-right: 10px;
`

const Arrow  = styled.span`
  font-size: 20px;
`


const LogoutSection  = styled.div`
  background-color: #555;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: 10px;
  width: 10%;
`



// const HeaderContainer = styled.div`
//   width: 100%;
//   height: 70px;
//   top: 0;
//   left: 0;
//   background-color: #151515;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const Title = styled.h1`
//   color: #FFFFFF;
//   font-size: 50px;
//   font-family: 'Passion One', cursive;
//   font-weight: 700;
//   margin-left: 30px;
// `;

// const RightContainer = styled.div`
//   margin-right: 30px;
//   img {
//     height: 50px;
//   }
// `