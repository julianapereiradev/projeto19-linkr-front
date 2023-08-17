import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { validateUser } from "../../constants/functions";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import reactStringReplace from 'react-string-replace';
import { useNavigate } from "react-router-dom";

export default function PostBox({ post }) {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {

        validateUser(user, setUser);

    }, [user]);

    const navigate = useNavigate();

    return (
        <>
            <Container>
                <ContainerPhoto>
                </ContainerPhoto>
                <ContainerContent>
                    <Username>Username</Username>
                    <Text>
                        {reactStringReplace(post.content, /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g, (match, i) => (
                            <span onClick={() => navigate(`/hashtag/${match}`)}>#{match}</span>
                        ))};
                    </Text>
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