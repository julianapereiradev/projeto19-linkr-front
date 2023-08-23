import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { backendroute, pages } from "../../routes/routes";
import { headersAuth, validateUser } from "../../constants/functions";
import PostBox from "../../components/PostBox/PostBox";
import { ColorText, ContainerTimeline, ContainerPost } from "./Styles";
import Header from "../../components/Header/Header";
import PublishBox from "../../components/PublishBox/PublishBox";
import Sidebar from "../../components/Sidebar/Sidebar";
import InfiniteScroll from "react-infinite-scroller";

export default function TimelinePage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [disable, setDisable] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    validateUser(user, setUser);
    loadPosts();
  }, [user]);

  const loadPosts = () => {
    axios
      .get(backendroute.getAllPosts, {
        ...headersAuth(user.token),
      })
      .then((res) => {
        const newPosts = res.data;
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        if (newPosts.length < 10) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        navigate(pages.timeline);
        alert(error);
      });
  };

  const handleInfiniteLoad = () => {
    if (hasMore) {
      loadPosts();
    }
  };

  function postUrlLink(e) {
    e.preventDefault();
    setDisable(true);
    setPublishing(true);

    const informations = { url: url, content: content };
    if (!url) {
      alert("É necessário informar uma url");
      setPublishing(false);
      setDisable(false);
      return;
    }

    axios
      .post(backendroute.postLink, informations, headersAuth(user.token))
      .then((resp) => {
        setUrl("");
        setContent("");
        setPublishing(false);
        setDisable(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("There was an error publishing your link");
        setPublishing(false);
        setDisable(false);
      });
  }

  return (
    <>
      <Header />
      <PageContainer>
        <ContainerTimeline>
          <ContainerPost>
            <ColorText>timeline</ColorText>
            <PublishBox
              user={user}
              url={url}
              content={content}
              disable={disable}
              publishing={publishing}
              onUrlChange={(e) => setUrl(e.target.value)}
              onContentChange={(e) => setContent(e.target.value)}
              onPublish={postUrlLink}
            />

            <InfiniteScroll
              pageStart={1}
              loadMore={handleInfiniteLoad}
              hasMore={hasMore}
              loader={<div className="loader" key={0}>Carregando...</div>}
            >
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostBox key={post.id} post={post} />
                ))
              ) : (
                <ContainerText>
                  <div data-test="message">Não existem posts!</div>
                </ContainerText>
              )}
            </InfiniteScroll>
          </ContainerPost>
        </ContainerTimeline>
        <Sidebar />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.main`
  display: flex;
  justify-content: center;
  gap: 80px;
`

const ContainerText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 600;
  font-size: 30px;
  font-family: 'Oswald', sans-serif;
  color: #FFFFFF;
`;
