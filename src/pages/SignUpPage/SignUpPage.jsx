import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import {
  SignUpContainer,
  LeftContent,
  RightContent,
  SignUpForm,
  LinkToSignIn,
} from "./Styles";

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
    <SignUpContainer>

      <LeftContent>
        <h1><span>linkr</span></h1>
        <h2>save, share and discover</h2>
        <h2>the best links on the web</h2>
      </LeftContent>

      <RightContent>
        <SignUpForm onSubmit={SignUp}>
          <input
            data-test="email"
            type="email"
            autoComplete="email"
            placeholder="e-mail"
            required
            disabled={disable}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            data-test="password"
            type="password"
            placeholder="password"
            autoComplete="password"
            required
            disabled={disable}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            data-test="username"
            type="text"
            autoComplete="username"
            placeholder="username"
            required
            disabled={disable}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            data-test="picture-url"
            type="text"
            autoComplete="picture-url"
            placeholder="picture url"
            required
            disabled={disable}
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
          />

          <button 
          data-test="sign-up-btn"
          type="submit" 
          disabled={disable}
          >
            {disable ? (
              <ThreeDots
                type="ThreeDots"
                color="#000000"
                height={20}
                width={50}
              />
            ) : (
              "Sign Up"
            )}
          </button>
          <LinkToSignIn 
          data-test="login-link"
          to={pages.signIn}
          >Switch back to log in</LinkToSignIn>
        </SignUpForm>
      </RightContent>
      
    </SignUpContainer>
  );
}
