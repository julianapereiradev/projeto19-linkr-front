
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { backendroute, pages } from "../../routes/routes";
import { useState } from "react";
import { SignInContainer, LeftContent,  RightContent, SignInForm, LinkToSignUp } from "./Styles"

export default function SignInPage() {
  // const { setUser } = useContext(AuthContext)
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
        // const newUser = {
        //   token: res.data.token
        // }
        // setUser(newUser);
        // localStorage.setItem("user", JSON.stringify(newUser))
        navigate(pages.signUp); //mudar depois para home
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

      <button type="submit" disabled={disable}>
        {disable ? (
          <ThreeDots type="ThreeDots" color="#000000" height={20} width={50} />
        ) : (
          "Log In"
        )}
      </button>
      <LinkToSignUp to={pages.signUp}>
        First time? Create an account!
      </LinkToSignUp>
      </SignInForm>
      </RightContent>

    </SignInContainer>
  );
}