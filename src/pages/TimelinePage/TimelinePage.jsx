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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    validateUser(user, setUser);
    loadPosts();
  }, [user]);

  const loadPosts = () => {
    if (!loading) {
      setLoading(true);

      axios.get(backendroute.getAllPosts, { ...headersAuth(user.token) })
        .then((res) => {
          const newPosts = res.data;
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          if (newPosts.length < 10) {
            setHasMore(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          navigate(pages.timeline);
          alert('Error fetching posts.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function loadFunc(page) {
    if (!loading) {
      setLoading(true);
      const page = currentPage + 1;
      const offset = (page - 1) * 10;
      axios.get(`${backendroute.getAllPosts}?offset=${offset}`, headersAuth(user.token))
        .then((res) => {
          const newPosts = res.data;
          if (newPosts.length === 0) {
            setHasMore(false);
          } else {
            setPosts([...posts, ...newPosts]);
            setCurrentPage(page);
          }
        })
        .catch((err) => {
          console.error('Error fetching posts:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

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
        alert("Link publicado com sucesso!"); 
      })
      .catch((error) => {
        console.error('Error publishing link:', error);
        alert("Houve um erro ao publicar o link.");
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
              pageStart={0}
              loadMore={loadFunc}
              hasMore={hasMore}
              loader={<div key={0}>Loading...</div>}
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
