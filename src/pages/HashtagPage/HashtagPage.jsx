import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { backendroute } from "../../routes/routes";
import reactStringReplace from 'react-string-replace';
import axios from "axios";

export default function HashtagPage() {
  const [posts, setPosts] = useState([{
    name: "Juvenal Juvêncio",
    image: "https://img.freepik.com/free-icon/user_318-644324.jpg",
    likes: 13,
    content: "Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material"
  }]);

  const params = useParams();

  const navigate = useNavigate();
  
  const hashtag = params.hashtag;


  useEffect(() => {
    
    //const config = { headers: { Authorization: `Bearer ${token}` } };
    axios.get(backendroute.getHashtagPosts + hashtag)
      .then(res => {
        setPosts(res.data);
      })
      .catch(res => {
        console.log("Failed to get posts containing the hashtag", res.data.message);
      });
  }, []);


  return (
    <>
      <Header />
      <PageContainer>
        <PostsContainer>
          <Title># {hashtag}</Title>

          {posts.map((post, index) =>
            <Post key={index}>
              <LeftContainer>
                <img src={post.image} />
                <BiHeart size="30" color="#FFFFFF" />
                <Likes>{post.likes} likes</Likes>
              </LeftContainer>
              <RightContainer>
                <Name>{post.name}</Name>
                <Content>
                  {reactStringReplace(post.content, /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g, (match, i) => (
                    <span onClick={() => navigate(`/hashtag/${match}`)}>#{match}</span>
                  ))};
                </Content>
                <Url></Url>
              </RightContainer>
            </Post>
          )}

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
  row-gap: 20px;
  margin-top: 20px;
`

const Post = styled.div`
  display: flex;
  box-sizing: content-box;
  gap: 10px;
  background-color: #171717;
  border-radius: 15px;
  padding: 15px;
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

const Likes = styled.a`
  font-size: 13px;
  color: #FFFFFF;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const Name = styled.p`
  color: #FFFFFF;
  font-weight: 700;
  font-size: 17px;
  font-family: 'Lato', sans-serif;
`

const Content = styled.p`
  color: #B7B7B7;
  font-weight: 400;
  font-size: 17px;
  font-family: 'Lato', sans-serif;
  span {
    font-weight: 900;
  }
`

const Url = styled.div`
`

