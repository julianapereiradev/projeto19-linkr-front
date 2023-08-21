import styled from "styled-components";

export default function PublishBox({
  user,
  url,
  content,
  disable,
  publishing,
  onUrlChange,
  onContentChange,
  onPublish
}) {

  return (
    <Container data-test="publish-box">
      <ContainerPhoto src={user.pictureUrl} alt="Foto do usuário" />
      <ContainerInputs>
        <Text>What are you going to share today?</Text>
        <InputUrl
          data-test="link"
          type="text"
          placeholder="http://..."
          value={url}
          onChange={onUrlChange}
          disabled={disable}
        />
        <InputContent
          data-test="description"
          type="text"
          placeholder="Awesome article about #javascript"
          value={content}
          onChange={onContentChange}
          disabled={disable}
        />
        <ButtonContainer>
          <Button data-test="publish-btn" onClick={onPublish} disabled={disable || publishing}>
            {publishing ? "Publishing..." : "Publish"}
          </Button>
        </ButtonContainer>
      </ContainerInputs>
    </Container>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

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
    margin-top: 50px;
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