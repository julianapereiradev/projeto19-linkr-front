import { useContext, useEffect } from 'react';
import Header from '../../components/Header/Header';
import {ColorText, Container, ContainerPost} from './Styles';
import AuthContext from '../../contexts/AuthContext';
import { validateUser } from '../../constants/functions';
import PublishBox from '../../components/PublishBox/PublishBox';

export default function TimelinePage() {
    const { user, setUser } = useContext(AuthContext);
  useEffect(() => {

    validateUser(user, setUser); //Garante a persistência do token do usuário mesmo depois do F5

  }, [user]);
    
    console.log('user do context aqui:', user);

    return (
      <>
        <Header />
        <Container>
          <ContainerPost>
          <ColorText>timeline</ColorText>
          <PublishBox></PublishBox>
          </ContainerPost>
        </Container>
      </>
    );
}