import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { backendroute } from "../../routes/routes";
import PostBox from "../../components/PostBox/PostBox";
import { headersAuth, validateUser } from "../../constants/functions";
import { PageContainer, Title, PostsContainer, ContainerText } from "./Styles";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

export default function HashtagPage() {
  const { user, setUser } = useContext(AuthContext);
  const [posts, setPosts] = useState(undefined);

  const params = useParams();
  const hashtag = params.id;

  headersAuth(user.token)

  useEffect(() => {
    axios.get(backendroute.getHashtagPosts + hashtag, headersAuth(user.token))
      .then((res) => {
        setPosts(res.data);
      })
      .catch((res) => {
        console.log("Failed to get posts containing the hashtag", res.data.message);
      });
  }, []);


  return (
    <>
      <Header />
      <PageContainer>
        <PostsContainer>
          <Title># {hashtag}</Title>

          {posts ? (
            posts.map((post) => <PostBox key={post.id} post={post} />)
          ) : (
            <ContainerText>
              <div>Não existem posts!</div>
            </ContainerText>
          )}

        </PostsContainer>
        <Sidebar />
      </PageContainer>
    </>
  )

}