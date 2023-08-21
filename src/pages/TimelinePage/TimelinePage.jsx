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

export default function TimelinePage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState(undefined);
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [publishing, setPublishing] = useState(false);

  
  useEffect(() => {
    validateUser(user, setUser);

    axios
      .get(backendroute.getAllPosts, headersAuth(user.token))
      .then((res) => {
        setPosts(res.data);
      })
      .catch((erro) => {
        navigate(pages.signIn);
        alert(erro);
      });
  }, [user]);
  

  function postUrlLink(e) {
    e.preventDefault();
    setDisable(true);
    setPublishing(true);

    const informations = { url: url, content: content };
    if(!url){
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
        alert("Não foi possivel publicar o link: ", error);
        setPublishing(false);
        setDisable(false);
      });
  }
  return (
    <>
      <Header />
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

          {posts ? (
            posts.map((post) => <PostBox key={post.id} post={post} />)
          ) : (
            <ContainerText>
              <div data-test="message">There are no posts yet</div>
            </ContainerText>
          )}
        </ContainerPost>
      </ContainerTimeline>
    </>
  );
}

const ContainerText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  font-weight: 600;
  font-size: 30px;
`;
