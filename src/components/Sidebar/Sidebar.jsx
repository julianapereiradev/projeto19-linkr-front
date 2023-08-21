import { useEffect, useState, useContext } from "react";
import { SideBarContainer, Title, Line, HashtagsContainer, Hashtag } from "./Styles";
import { useNavigate } from "react-router-dom";
import { backendroute } from "../../routes/routes";
import AuthContext from "../../contexts/AuthContext";
import { headersAuth, validateUser } from "../../constants/functions";
import axios from "axios";

export default function Sidebar() {
  const { user, setUser } = useContext(AuthContext);
  const [hashtags, setHashtags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    validateUser(user, setUser);

    axios.get(backendroute.getTrendingHashtags, headersAuth(user.token))
      .then((res) => {
        setHashtags(res.data);
      })
      .catch((res) => {
        console.log(res.data.message);
      });
  }, [user]);

  return (
    <SideBarContainer>
      <Title> trending </Title>
      <Line />
      <HashtagsContainer data-test="trending">
        {hashtags.map((hashtag, index) =>
          <Hashtag key={index} onClick={() => navigate(`/hashtag/${hashtag.hashtag}`)}>
            <li># {hashtag.hashtag}</li>
          </Hashtag>
        )}
      </HashtagsContainer>
    
    </SideBarContainer>
  );
}