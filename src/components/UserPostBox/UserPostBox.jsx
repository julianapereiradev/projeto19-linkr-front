import { useContext, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
//import urlMetadata from "url-metadata";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";

export default function UserPostBox({ post }) {
  const { user } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState(false);
  // const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);


  function like(p) {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    const body = {
      userId: p.userId,
      postId: p.id,
    };

    const promise = axios.post(
      backendroute.likes,
      body,
      headersAuth(user.token)
    );
    promise.then((res) => {
      console.log(res.data);
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  /*
  async function fetchUrlMetadata() {
    try {
      const metadata = await urlMetadata(post.url);
      setUrlMetadataInfo(metadata);
    } catch (error) {
      console.error("Erro ao buscar metadados da URL:", error);
    }
  }
  */

  // if (post) {
  // // fetchUserData();
  // if (post.url) {
  //     fetchUrlMetadata();
  // }
  // }

  //Essa parte esta dando problema no console

  return (
    <>
      <Container>
        <ContainerLike>
          <ContainerPhoto>
            <UserImage 
            src={post.pictureUrl} alt="Foto do Usuário" />
          </ContainerPhoto>

          {isLiked ? (
            <FiHeart size="27" color="#FFF" onClick={() => like(post)} />
          ) : (
            <FaHeart size="27" color="#AC0000" onClick={() => like(post)} />
          )}
        </ContainerLike>

        <ContainerContent>
          <Username>{post.username}</Username>
          <Text>{post.content}</Text>
          <Link>
            <h1>Link: {post.url}</h1>

            {/*{urlMetadataInfo && (
              <div>
                <p>{urlMetadataInfo.title}</p>
                <p>{urlMetadataInfo.description}</p>
                <p>
                  <img src={urlMetadataInfo.image} alt="metadata" />
                </p>
              </div>
            )}*/}
            
          </Link>
        </ContainerContent>
      </Container>
    </>
  );
}

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 27px;
`;

const ContainerPhoto = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 27px;
  margin: 16px;
  padding: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;
const Container = styled.div`
  width: 611px;
  height: 276px;
  background-color: #151515;
  border-radius: 20px;
  display: flex;
  margin-bottom: 15px;
`;
const Text = styled.text`
  font-family: Lato;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #b7b7b7;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Username = styled.text`
  font-family: Lato;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
`;

const Link = styled.div`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #cecece;
`;
