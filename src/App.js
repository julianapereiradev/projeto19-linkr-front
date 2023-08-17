import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pages } from "./routes/routes";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HashtagPage from "./pages/HashtagPage/HashtagPage";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";
import UserPostsPage from "./pages/UserPostsPage/UserPostsPage";


export default function App() {
  const [user, setUser] = useState(0);

  return (
  <AuthContext.Provider value={{user, setUser}}>
   <BrowserRouter>
   <Routes>
    <Route path={pages.signUp} element={<SignUpPage />} />
    <Route path={pages.signIn} element={<SignInPage />} />
    <Route path={pages.hashtag} element={<HashtagPage />} />
    <Route path={pages.timeline} element={<TimelinePage />} />
    <Route path={pages.userPosts + ':id'} element={<UserPostsPage />} />
   </Routes>
   </BrowserRouter>
   </AuthContext.Provider>
  );
}