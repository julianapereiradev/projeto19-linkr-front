import styled from "styled-components";
import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { BiHeart } from "react-icons/bi";

export default function HashtagPage() {

  return (
    <>
      <Header />
      <PageContainer>
        <PostsContainer>
          <Title># </Title>
          <Post>
            <LeftContainer>
              <img src="https://img.freepik.com/free-icon/user_318-644324.jpg" />
              <BiHeart size="30" color="#FFFFFF"/>

            </LeftContainer>
            <RightContainer>
              <Name>Juvenal Juvêncio</Name>
              <Content>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</Content>
              <Url></Url>

            </RightContainer>
          </Post>
        </PostsContainer>
        <Sidebar />
      </PageContainer>
    </>
  )

}

const PageContainer = styled.main`
  display: flex;
  justify-content: center;
  gap: 20px;
  min-height: 100vh;
  width: 100%;
  background-color: #333333;
`

const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #FFFFFF;
`

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  row-gap: 15px;
  margin-top: 20px;
`

const Post = styled.div`
  display: flex;
  box-sizing: content-box;
  gap: 10px;
  background-color: #171717;
  border-radius: 15px;
  padding: 10px 15px 10px;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  img {
    height: 50px;
  }
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const Name = styled.p`
  color: #FFFFFF;
  font-weight: 400;
  font-size: 17px;
  font-family: 'Lato', sans-serif;
`

const Content = styled.p`
  color: #FFFFFF;
  font-weight: 400;
  font-size: 17px;
  font-family: 'Lato', sans-serif;
`

const  Url = styled.div`
`