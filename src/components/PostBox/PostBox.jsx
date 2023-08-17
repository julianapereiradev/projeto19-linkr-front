import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { headersAuth, validateUser } from "../../constants/functions";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";


export default function PostBox({ post }) {
    const { user, setUser } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {

        validateUser(user, setUser);

    }, [user]);

    function like(p){
        if ( !isLiked ){
            setIsLiked(true)
        }else{
            setIsLiked(false)
        }
        const body = {
            userId: p.userId,
            postId: p.id
        }

        const promise = axios.post(backendroute.likes, body, headersAuth(user.token))
        promise.then((res) => {
            console.log(res.data)
        })
        promise.catch((err) => {
            alert(err.response.data)
        })
    }

    return (
        <>
            <Container>
                <ContainerLike>
                    <ContainerPhoto>
                    </ContainerPhoto>
                    {isLiked ?
                    <FiHeart size="27" color="#FFF" onClick={() => like(post)}/>
                    :  
                    <FaHeart size="27" color="#AC0000" onClick={() => like(post)}/>
                    }
                </ContainerLike>

                <ContainerContent>
                    <Username>Username</Username>
                    <Text>Conteúdo: {post.content}</Text>
                    <Link>
                        <h1>Link: {post.url}</h1>
                    </Link>
                </ContainerContent>
            </Container>
        </>
    );
}

const ContainerPhoto = styled.div`
    background-color:red;
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin: 16px;
    padding: 27px;
  
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