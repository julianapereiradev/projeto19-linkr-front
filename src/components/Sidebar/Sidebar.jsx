import { useEffect, useState, useContext } from "react";
import { SideBarContainer, Title, Line, Hashtag } from "./Styles";
import { Navigate, useNavigate } from "react-router-dom";
import { backendroute } from "../../routes/routes";
import AuthContext from "../../contexts/AuthContext";
import { headersAuth, validateUser } from "../../constants/functions";
import axios from "axios";

export default function Sidebar() {
  const { user, setUser } = useContext(AuthContext);
  const [hashtags, setHashtags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(backendroute.getTrendingHashtags, headersAuth(user.token))
      .then(res => {
        setHashtags(res.data);
      })
      .catch(res => {
        console.log("Failed to load trending hashtags");
      });
  }, []);

  return (
    <SideBarContainer>
      <Title> trending </Title>
      <Line />
      {hashtags.map((hashtag, index) =>
        <Hashtag key={index} onClick={() => navigate(`/hashtag/${hashtag}`)}>
          # {hashtag}
        </Hashtag>
      )}
    </SideBarContainer>
  );
}