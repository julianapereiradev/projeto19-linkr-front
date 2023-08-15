import { useState } from "react";
import { SideBarContainer, Title, Line, Hashtag } from "./Styles";

export default function Sidebar() {
  const [hashtags, setHashtags] = useState([
    "javascript", "react", "react-native", "material", "web-dev", "mobile", "css", "html", "node", "sql"
  ]);

  return (
    <SideBarContainer>
      <Title> trending </Title>
      <Line />
      {hashtags.map((hashtag, index) =>
        <Hashtag key={index}>
          # {hashtag}
        </Hashtag>
      )}
    </SideBarContainer>
  );
}