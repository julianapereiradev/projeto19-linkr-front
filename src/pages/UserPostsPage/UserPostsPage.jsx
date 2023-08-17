import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import { headersAuth, validateUser } from "../../constants/functions";
import { backendroute, pages } from "../../routes/routes";
import Header from "../../components/Header/Header";
import {ContainerUserPostsPage, ContainerPost, ColorText, ContainerText, UserImage, BoxUser} from "./Styles"
import UserPostBox from "../../components/UserPostBox/UserPostBox";


export default function UserPostsPage() {
  const { user, setUser } = useContext(AuthContext);
  const [userPosts, setuserPosts] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(backendroute.getAllPostsByUserId + id, headersAuth(user.token))
      .then((resp) => {
        setuserPosts(resp.data);
        console.log("resp em ugetAllPostsByUserId", resp);
      })
      .catch((error) => {
        console.log('error em getAllPostsByUserId', error)
        alert(error.response.data);
        navigate(pages.signIn);
      });
  }, [user]);

console.log("o que chega em userPosts", userPosts)

if(!userPosts) {
  return (
    <h1>Carregando...</h1>
  )
}

  return (
<>
<Header />

<ContainerUserPostsPage>
        <ContainerPost>
          <BoxUser>
          <UserImage src={userPosts[0]?.pictureUrl} alt="Foto do Usuário" />
          <ColorText>{userPosts[0]?.username}</ColorText>
          </BoxUser>
        
          {userPosts ? (
            userPosts.map((post) => <UserPostBox key={post.id} post={post} />)
          ) : (
            <ContainerText>
              <div>Não existem posts deste usuário!</div>
            </ContainerText>
          )}
        </ContainerPost>
      </ContainerUserPostsPage>
    </>
  );
}