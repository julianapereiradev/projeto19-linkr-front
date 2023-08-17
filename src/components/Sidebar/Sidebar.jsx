import { useEffect, useState } from "react";
import { SideBarContainer, Title, Line, Hashtag } from "./Styles";
import { Navigate, useNavigate } from "react-router-dom";
import { backendroute } from "../../routes/routes";
import axios from "axios";

export default function Sidebar() {
  const [hashtags, setHashtags] = useState([
    "javascript", "react", "react-native", "material", "web-dev", "mobile", "css", "html", "node", "sql"
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    /*
    axios.get(backendroute.getTrendingHashtags)
      .then(res => {
        setHashtags(res.data);
      })
      .catch(res => {
        console.log("Failed to load trending hashtags" + res.message.data);
      });
    */
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