import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
//import urlMetadata from "url-metadata";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";
import { Tooltip } from 'react-tooltip';
import { ThreeDots } from "react-loader-spinner";

export default function UserPostBox({ post }) {
  const { user } = useContext(AuthContext);

  const [selected, setSelected] = useState(false);
  const [postLikes, setPostLikes] = useState();
  // const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);


  useEffect(() => {
    const promiseLikes = axios.get(backendroute.getlikes + post.id, headersAuth(user.token))
    promiseLikes.then((res) => {
      setPostLikes(res.data)
    })
  }, [selected, post.id, post.url, user])

  if (!postLikes) {
    return <Load><ThreeDots color="#FFFFFF" height={50} width={50} /></Load>
  }

  function like() {

    const promiseUser = axios.get(
      backendroute.getDataUserByToken,
      headersAuth(user.token)
    );
    promiseUser.then((res) => {
      const body = {
        userId: res.data[0].userId,
        postId: post.id,
      };
      const promise = axios.post(
        backendroute.likes,
        body,
        headersAuth(user.token)
      );
      promise.then((res) => {
        setSelected(!selected);
      });
      promise.catch((err) => {
        alert(err.response.data);
      });
    });
    promiseUser.catch((err) => {
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
          <Icon>
            <LikeTooltip >
              {postLikes[0].isLiked ? (
                <FaHeart color="#AC0000" size={20} onClick={() => like()} />
              ) : (
                <FiHeart color="#fff" size={20} onClick={() => like()} />
              )}
              <a data-tooltip-id={String(post.id)} data-tooltip-place="bottom">
                <SCQntLikes>{postLikes[0].count} likes</SCQntLikes>
              </a>
              <SCTooltip id={String(post.id)} style={{ backgroundColor: "#fff" }}>
                <SCTooltipText>{postLikes[0].whoLiked}</SCTooltipText>
              </SCTooltip>
            </LikeTooltip>
          </Icon>
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

const LikeTooltip = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;

`;
const Load = styled.div`
    align-self: center;
    display: flex;
`;

const SCQntLikes = styled.p`
    margin-top: 10px;
    font-family: "Lato";
    font-weight: 400;
    font-size: 11;
    color: black;
`;

const SCTooltip = styled(Tooltip)`
    box-shadow: 0px 4px 4px 0px #000;
    width: 160px;
    height: 24px;
    opacity: 0.9;
    background-color: #fff;

    display: flex;
    align-items: center;
`;

const SCTooltipText = styled.p`
     font-family: "Lato";
    font-weight: 700;
    font-size: 11;
    color: black;
    text-align: center;
`;

const Icon = styled.div`
    &:hover {
        cursor: pointer;
    }
`;