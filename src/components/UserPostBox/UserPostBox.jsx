import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";
import { Tooltip } from 'react-tooltip';
import { ThreeDots } from "react-loader-spinner";
import reactStringReplace from "react-string-replace";
import { useNavigate } from "react-router-dom";
import NoImage from "../../assets/noimage2.png";

export default function UserPostBox({ post }) {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(false);
  const [postLikes, setPostLikes] = useState();
  const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);

  const navigate = useNavigate(); 

    const fetchUrlMetadata = async (url) => {
      try {
        const response = await axios.get(
          `https://jsonlink.io/api/extract?url=${url}`
        );
        setUrlMetadataInfo(response.data);
      } catch (error) {
        console.error("Error fetching URL metadata:", error);
      }
    };
  useEffect(() => {
    const promiseLikes = axios.get(backendroute.getlikes + post.id, headersAuth(user.token))
    promiseLikes.then((res) => {
      setPostLikes(res.data)
    })
    if (post.url) {
      fetchUrlMetadata(post.url);
    }
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

  return (
    <>
      <Container data-test="post">
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
          <Text>
            {reactStringReplace(
              post.content,
              /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g,
              (match, i) => (
                <span onClick={() => navigate(`/hashtag/${match}`)}>
                  #{match}
                </span>
              )
            )}
          </Text>
          {post.url && (
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <ContainerLink data-test="link">
                <ContainerDetails>
                  {urlMetadataInfo && (
                    <>
                      <LinkTitle>{urlMetadataInfo.title}</LinkTitle>
                      <LinkDescription>
                        {urlMetadataInfo.description}
                      </LinkDescription>
                      <Link>{post.url}</Link>
                    </>
                  )}
                </ContainerDetails>
                <ContainerImage>
                  {urlMetadataInfo &&
                    urlMetadataInfo.images &&
                    urlMetadataInfo.images.length > 0 ? (
                    <LinkImage src={urlMetadataInfo.images[0]} alt="metadata" />
                  ) : (
                    <LinkImage src={NoImage} alt="metadata" />
                  )}
                </ContainerImage>
              </ContainerLink>
            </a>
          )}
        </ContainerContent>
      </Container>
    </>
  );
}

const ContainerLink = styled.div`
  width: 503px;
  height: 155px;
  border: 0.5px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
`;
const ContainerDetails = styled.div`
  width: 302px;
`;

const LinkImage = styled.img`
  width: 153px;
  height: 153px;
  border-radius: 0px 10px 10px 0px;
`;

const ContainerImage = styled.div`
  width: 155px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
  padding-left: 10px;
`;

const LinkDescription = styled.p`
  font-family: Lato;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: #9b9595;
  margin-top: 10px;
  margin-left: 15px;
`;

const LinkTitle = styled.p`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #cecece;
  margin-top: 20px;
  margin-left: 15px;
`;

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
  @media(max-width: 625px) {
    width: 100%;
  }
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
