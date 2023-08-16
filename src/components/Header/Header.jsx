import { useEffect, useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import styled from "styled-components";

export default function Header() {
  const [image, setImage] = useState(
    "https://img.freepik.com/free-icon/user_318-644324.jpg"
  );

  const [showLogout, setShowLogout] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLogout) {
        const headerContainer = document.querySelector(".header-box");
        const logoutSection = document.querySelector(".logout-section");
  
        if (!headerContainer.contains(event.target) && !logoutSection.contains(event.target)) {
          setShowLogout(false);
          setArrowDirection("down");
        }
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

  function logout() {
    return alert("Clicou em logout")
  }

  return (
    <>
      <HeaderContainer className="header-box">
        <Title>linkr</Title>
        <RightContainer>
          <Arrow onClick={toggleLogout}>
            {arrowDirection === "down" ? (
              <BiSolidChevronDown color="#FFFFFF" size="50" />
            ) : (
              <BiSolidChevronUp color="#FFFFFF" size="50" />
            )}
          </Arrow>
          <img src={image} onClick={toggleLogout} />
        </RightContainer>
      </HeaderContainer>

      <LogoutPosition>
        {showLogout && <LogoutSection className="logout-section" onClick={() => logout()}>Logout</LogoutSection>}
      </LogoutPosition>
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  background-color: #151515;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 50px;
  font-family: "Passion One", cursive;
  font-weight: 700;
  margin-left: 30px;
`;

const RightContainer = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 50px;
  }
`;

const Arrow = styled.span`
  font-size: 20px;
`;

const LogoutPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const LogoutSection = styled.div`
  background-color: #151515;
  color: white;
  padding: 10px 30px;
  text-align: center;
  border-bottom-left-radius: 15px;
  width: 130px;
  font-family: 'Lato', sans-serif;
  font-size: 17px;
  cursor: pointer;
`;
