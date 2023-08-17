
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import { useContext, useState } from "react";
import { SignInContainer, LeftContent,  RightContent, SignInForm, LinkToSignUp } from "./Styles"
import AuthContext from "../../contexts/AuthContext";

export default function SignInPage() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function SignIn(e) {
    e.preventDefault();

    const newSignIn = { email: email, password: password };

    setDisable(true);

    axios
      .post(backendroute.postSignIn, newSignIn)
      .then((res) => {
        console.log('res.data do login', res.data)
        const newUser = {
          token: res.data.token,
          pictureUrl: res.data.pictureUrl,
          username: res.data.username
        }
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser))
        navigate(pages.timeline);
        setDisable(false);
      })
      .catch((erro) => {
        alert(erro.response.data);
        console.log("Erro em postSignIn", erro);
        setDisable(false);
      });
  }

  return (
    <SignInContainer>

      <LeftContent>
        <h1><span>linkr</span></h1>
        <h2>save, share and discover</h2>
        <h2>the best links on the web</h2>
      </LeftContent>

      <RightContent>
      <SignInForm onSubmit={SignIn}>
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

      <button 
      data-test="login-btn"
      type="submit" 
      disabled={disable}
      >
        {disable ? (
          <ThreeDots type="ThreeDots" color="#000000" height={20} width={50} />
        ) : (
          "Log In"
        )}
      </button>
      <LinkToSignUp 
      data-test="sign-up-link"
      to={pages.signUp}
      >
        First time? Create an account!
      </LinkToSignUp>
      </SignInForm>
      </RightContent>

    </SignInContainer>
  );
}