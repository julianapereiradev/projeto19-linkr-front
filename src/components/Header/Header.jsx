import { useContext, useEffect, useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import styled from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import { backendroute, pages } from "../../routes/routes";
import axios from "axios";
import { headersAuth } from "../../constants/functions";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";

export default function Header() {

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

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

  async function logout() {
    try {
      await axios.delete(backendroute.deleteLogout, headersAuth(user.token));
    
    } catch (error) {
      alert(error.response.data.message);
      console.log('error em deleteLogout')
    }

    localStorage.removeItem('user');
    setUser(0);
    navigate(pages.signIn)
  }

  // Função para lidar com o clique em um resultado de busca
  const handleSearchClick = (userId) => {
    navigate(pages.userPosts + userId)
  };


  return (
    <>
      <HeaderContainer className="header-box">
        <Title>linkr</Title>
       
       <Search onClick={handleSearchClick} />
         
        <RightContainer>
          <Arrow onClick={toggleLogout}>
            {arrowDirection === "down" ? (
              <BiSolidChevronDown color="#FFFFFF" size="50" />
            ) : (
              <BiSolidChevronUp color="#FFFFFF" size="50" />
            )}
          </Arrow>
          <img 
          data-test="avatar"
          src={user.pictureUrl} 
          alt="Foto do usuário" 
          onClick={toggleLogout} 
          />
        </RightContainer>
      </HeaderContainer>

      <LogoutPosition>
        {showLogout && <LogoutSection data-test="menu" className="logout-section"><button data-test="logout" onClick={() => logout()}>Logout</button></LogoutSection>}
      </LogoutPosition>
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 72px;
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
    width: 50px;
    border-radius: 50%;
  }
`;

const Arrow = styled.span`
  font-size: 20px;
`;

const LogoutPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  right: 0;
`;

const LogoutSection = styled.div`
  background-color: #151515;
  padding: 10px 30px;
  text-align: center;
  border-bottom-left-radius: 15px;
  width: 130px;


button {
  background-color: #151515;
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 17px;
}
`;
