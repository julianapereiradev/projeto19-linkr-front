import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { validateUser } from "../../constants/functions";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";
import { headersAuth } from "../../constants/functions";

export default function PublishBox() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false); 
  const [isInputsDisabled, setIsInputsDisabled] = useState(false); 
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    validateUser(user, setUser);
  }, [user]);

  const handlePublish = async () => {
    setIsPublishing(true); 
    setIsInputsDisabled(true);

    try {
      const response = await axios.post(
        backendroute.postLink,
        {
          url,
          content,
        },
        headersAuth(user.token)
      );

      if (response.status === 201) {
        console.log("Link publicado com sucesso!");
        setUrl(""); 
        setContent(""); 
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao publicar link:", error);
      alert("Houve um erro ao publicar seu link.");
    } finally {
      setIsPublishing(false); 
      setIsInputsDisabled(false); 
    }
  };

  return (
    <>
      <Container>
        <ContainerPhoto src={user.pictureUrl} alt="Foto do usuário"/>
        <ContainerInputs>
          <Text>O que você vai compartilhar hoje?</Text>
          <InputUrl
            type="text"
            placeholder="http://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isInputsDisabled}
          />
          <InputContent
            type="text"
            placeholder="Artigo incrível sobre #javascript"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isInputsDisabled} 
          />
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? "Publicando..." : "Publicar"}
          </Button>
        </ContainerInputs>
      </Container>
    </>
  );
}


const ContainerPhoto = styled.img`
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
    margin-bottom: 25px;
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