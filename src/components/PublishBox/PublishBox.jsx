import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { validateUser} from "../../constants/functions";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";


export default function PublishBox() {
    const [url, setUrl] = useState(''); 
    const [content, setContent] = useState(''); 
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {

        validateUser(user, setUser); 

    }, [user]);
    
    const handlePublish = async () => {

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        console.log(config);

      try {
        const response = await axios.post(backendroute.postLink, {
          url,
          content,
        }, config);
  
        if (response.status === 201) {
          console.log('Link publicado com sucesso!');
    
        }
      } catch (error) {
        console.error('Erro ao publicar link:', error);
      }
    };
  
    return (
        <>
            <Container>
                <ContainerPhoto>
                </ContainerPhoto>
                <ContainerInputs>
                    <Text>What are you going to share today?</Text>
                    <InputUrl 
                        type="text" 
                        placeholder="http://" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <InputContent 
                        type="text"
                        placeholder="Awesome article about #javascript"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}     
                    />
                    <Button onClick={handlePublish}>Publish</Button>
                </ContainerInputs>
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
`
const ContainerInputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`
const Container = styled.div`
    width: 611px;
    height: 209px;
    background-color: white;
    border-radius: 20px;
    display: flex;
`
const InputUrl = styled.input`
    width: 503px;
    height: 30px;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background-color: #EFEFEF;
    font-family: Lato;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
`;
const InputContent = styled.input`
    width: 503px;
    height: 66px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background-color: #EFEFEF;
    font-family: Lato;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    &::placeholder {
        vertical-align: top;
    }
`;
const Button = styled.button`
    width: 112px;
    height: 31px;
`
const Text = styled.text`
    font-family: Lato;
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #707070;
    margin-bottom: 10px;
`