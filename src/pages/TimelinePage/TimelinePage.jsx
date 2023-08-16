import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import {ColorText, Container, ContainerPost} from './Styles';
import AuthContext from '../../contexts/AuthContext';
import { headersAuth, validateUser } from '../../constants/functions';
import PublishBox from '../../components/PublishBox/PublishBox';
import PostBox from '../../components/PostBox/PostBox';
import { backendroute } from '../../routes/routes';
import axios from 'axios';

export default function TimelinePage() {
    const { user, setUser } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    validateUser(user, setUser);
    
    axios.get(backendroute.postLink, headersAuth(user.token))
      .then(response => {
        setPosts(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Erro ao buscar posts:', error);
      });

  }, [user]);

    return (
      <>
        <Header />
        <Container>
          <ContainerPost>
          <ColorText>timeline</ColorText>
          <PublishBox></PublishBox>
          {posts.map(post => (
            <PostBox key={post.id} post={post} />
          ))}
          </ContainerPost>
        </Container>
      </>
    );
}