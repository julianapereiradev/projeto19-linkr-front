import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import { headersAuth, validateUser } from "../../constants/functions";
import { backendroute, pages } from "../../routes/routes";
import Header from "../../components/Header/Header";
import {ContainerUserPostsPage, ContainerPost, ColorText, ContainerText, UserImage, BoxUser, PageContainer} from "./Styles"
import UserPostBox from "../../components/UserPostBox/UserPostBox";
import Sidebar from "../../components/Sidebar/Sidebar";

import styled from "styled-components" 


export default function UserPostsPage() {
  const { user, setUser } = useContext(AuthContext);
  const [userPosts, setuserPosts] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  const [followButton, setFollowButton] = useState({
    content: "",
    background: "",
    color: "",
    disabled: false
  });
  
  
  useEffect(() => {
    
    validateUser(user, setUser);

    axios
      .get(backendroute.getAllPostsByUserId + id, headersAuth(user.token))
      .then((resp) => {
        console.log(resp.data)
        setuserPosts(resp.data.posts);
        if (!resp.data.isFollowing) {
          setFollowButton({ content: "Unfollow", background: "#FFFFFF", color: "#1877F2" });
        } else {
          setFollowButton({ content: "Follow", background: "#1877F2", color: "#FFFFFF" });
        }
        //console.log("resp em ugetAllPostsByUserId", resp);
      })
      .catch((error) => {
        console.log('error em getAllPostsByUserId', error)
        alert(error.response.data);
        navigate(pages.signIn);
      });
// eslint-disable-next-line
  }, [user]);
  

//console.log("o que chega em userPosts", userPosts)

  function followUser() {
    setFollowButton({ disabled: true });
    console.log(backendroute.followUser + id)
    axios
      .post(backendroute.followUser + id)
      .then(res => {
        console.log(res.data)
        if (res.data = "followed") {
          setFollowButton({ content: "Unfollow", background: "#FFFFFF", color: "#1877F2" });
        } else {
          setFollowButton({ content: "Follow", background: "#1877F2", color: "#FFFFFF" });
        }
      })
      .catch(res => {
        console.log("erro ao seguir", res.data)
      });

      setFollowButton({ disabled: false }) 
  }

if(!userPosts) {
  return (
    <h1>Carregando...</h1>
  )
}

  return (
    <>
      <Header />
      <PageContainer>
        <ContainerUserPostsPage>
          <ContainerPost>
            <BoxUser>
              <UserImage src={userPosts[0]?.pictureUrl} alt="Foto do Usuário" />
              <ColorText>{userPosts[0]?.username}</ColorText>
              <FollowButton
                onClick={followUser}
                background={followButton.background}
                color={followButton.color}
              >
                {followButton.content}
              </FollowButton>
            </BoxUser>
          
            {userPosts ? (
              userPosts.map((post) => <UserPostBox key={post.id} post={post} />)
            ) : (
              <ContainerText>
                <div>There are no posts yet for this user!</div>
              </ContainerText>
            )}
          </ContainerPost>
        </ContainerUserPostsPage>
        <Sidebar /> 
      </PageContainer>
    </>
  );
}

const FollowButton = styled.button`
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  color: ${props => props.color};
  background: ${props => props.background};
  width: 60px;
  height: 2em;
  position: absolute;
  margin-top: 15px;
  margin-left: 550px;
`