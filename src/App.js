import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pages } from "./routes/routes";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HashtagPage from "./pages/HashtagPage";

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path={pages.signUp} element={<SignUpPage />} />
    <Route path={pages.signIn} element={<SignInPage />} />
    <Route path={"/hashtag/:hashtag"} element={<HashtagPage />} />
   </Routes>
   </BrowserRouter>
  );
}