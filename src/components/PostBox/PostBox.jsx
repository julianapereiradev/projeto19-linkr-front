import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
//import urlMetadata from "url-metadata";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { ThreeDots } from "react-loader-spinner";

import reactStringReplace from 'react-string-replace';

export default function PostBox({ post }) {
    const { user } = useContext(AuthContext);

    const [selected, setSelected] = useState(false);
    const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);
    const [postLikes, setPostLikes] = useState();

    const navigate = useNavigate();

    function openUrlId(userId) {
        navigate(pages.userPosts + userId)
    };

    useEffect(() => {
        const promiseLikes = axios.get(backendroute.getlikes + post.id, headersAuth(user.token))
        promiseLikes.then((res) => {
            setPostLikes(res.data)
        })
    }, [selected, post.id])

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
                            onClick={() => openUrlId(post.userId)}
                            src={post.pictureUrl} alt="Usuário" />
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
                    <Username onClick={() => openUrlId(post.userId)}>{post.username}</Username>
                    <Text>
                        {reactStringReplace(post.content, /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g, (match, i) => (
                            <span onClick={() => navigate(`/hashtag/${match}`)}>#{match}</span>
                        ))};
                    </Text>

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
const Icon = styled.div`
    &:hover {
        cursor: pointer;
    }
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
  span {
    font-weight: 900;
  }
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
`

const SCTooltip = styled(Tooltip)`
    box-shadow: 0px 4px 4px 0px #000;
    width: 160px;
    height: 24px;
    opacity: 0.9;
    background-color: #fff;

    display: flex;
    align-items: center;
`

const SCTooltipText = styled.p`
     font-family: "Lato";
    font-weight: 700;
    font-size: 11;
    color: black;
    text-align: center;
`