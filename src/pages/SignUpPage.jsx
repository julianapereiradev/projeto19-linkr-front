import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { backendroute, pages } from "../routes/routes";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  function SignUp(e) {
    e.preventDefault();

    const newSignUp = {
      email: email,
      password: password,
      username: username,
      pictureUrl: pictureUrl,
    };

    setDisable(true);

    axios
      .post(backendroute.postSignUp, newSignUp)
      .then((res) => {
        navigate(pages.signIn);
        setDisable(false);
      })
      .catch((erro) => {
        alert(erro.response.data);
        console.log("Erro em postSignUp", erro);
        setDisable(false);
      });
  }

  return (
    <SingUpContainer onSubmit={SignUp}>
      <input
        type="email"
        autoComplete="email"
        placeholder="e-mail"
        required
        disabled={disable}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        autoComplete="password"
        required
        disabled={disable}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        autoComplete="username"
        placeholder="username"
        required
        disabled={disable}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        autoComplete="picture-url"
        placeholder="picture url"
        required
        disabled={disable}
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
      />

      <button type="submit" disabled={disable}>
        {disable ? (
          <ThreeDots type="ThreeDots" color="#000000" height={20} width={50} />
        ) : (
          "Sign Up"
        )}
      </button>
      <LinkToSignIn to={pages.signIn}>Switch back to log in</LinkToSignIn>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.form`
  //
`;

const LinkToSignIn = styled(Link)`
  color: #000000;
  text-decoration: underline;
`;
