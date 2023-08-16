import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pages } from "./routes/routes";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HashtagPage from "./pages/HashtagPage";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";


export default function App() {
  const [user, setUser] = useState(0);

  return (
  <AuthContext.Provider value={{user, setUser}}>
   <BrowserRouter>
   <Routes>
    <Route path={pages.signUp} element={<SignUpPage />} />
    <Route path={pages.signIn} element={<SignInPage />} />
    <Route path={"/hashtag/:hashtag"} element={<HashtagPage />} />
    <Route path={pages.timeline} element={<TimelinePage />} />
   </Routes>
   </BrowserRouter>
   </AuthContext.Provider>
  );
}