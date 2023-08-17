import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { headersAuth, validateUser } from "../../constants/functions";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import urlMetadata from "url-metadata";

export default function PostBox({ post }) {
    const [userData, setUserData] = useState(null);
    const [urlMetadataInfo, setUrlMetadataInfo] = useState(null);
    const { user, setUser } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        validateUser(user, setUser);
}, [user]);

function like(p){
    if ( !isLiked ){
        setIsLiked(true)
    } else {
        setIsLiked(false)
    }
    const body = {
        userId: p.userId,
        postId: p.id
    }

    const promise = axios.post(backendroute.likes, body, headersAuth(user.token));
    promise.then((res) => {
        console.log(res.data)
    })
    promise.catch((err) => {
        alert(err.response.data)
    })
}

async function fetchUserData() {
    try {
        const response = await axios.post(backendroute.getUserById, {
            userId: post.userId,
        }, headersAuth(user.token));
        setUserData(response.data);
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}

async function fetchUrlMetadata() {
    try {
        const metadata = await urlMetadata(post.url);
        setUrlMetadataInfo(metadata);
    } catch (error) {
        console.error('Erro ao buscar metadados da URL:', error);
    }
}

if (post) {
    fetchUserData();
    if (post.url) {
        fetchUrlMetadata();
    }
}

return (
    <>
        <Container>
            <ContainerLike>
                <ContainerPhoto>
                    {userData && <UserImage src={userData.pictureUrl} alt="Foto do Usuário" />}
                </ContainerPhoto>
                {isLiked ?
                <FiHeart size="27" color="#FFF" onClick={() => like(post)}/>
                :  
                <FaHeart size="27" color="#AC0000" onClick={() => like(post)}/>
                }
            </ContainerLike>
              <ContainerContent>
                    {userData && <Username>{userData.username}</Username>}
                    <Text>{post.content}</Text>
                    <Link>
                        <h1>Link: {post.url}</h1>
                        {urlMetadataInfo && (
                            <div>
                                <p>{urlMetadataInfo.title}</p>
                                <p>{urlMetadataInfo.description}</p>
                                <p> <img src={urlMetadataInfo.image} alt="URL Image" /></p>
                            </div>
                        )}
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
`

const ContainerPhoto = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin: 16px;
    padding: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContainerLike = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`
const Container = styled.div`
    width: 611px;
    height: 276px;
    background-color: #151515;
    border-radius: 20px;
    display: flex;
    margin-bottom: 15px;
   
`
const Text = styled.text`
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #B7B7B7;
    margin-top: 10px;
    margin-bottom: 10px;
`
const Username = styled.text`
    font-family: Lato;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
`

const Link = styled.div`
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: #CECECE;
`