import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { headersAuth } from "../../constants/functions";
import AuthContext from "../../contexts/AuthContext";
import { backendroute } from "../../routes/routes";

export default function Search({ onClick }) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  
  useEffect(() => {
    if (name.length >= 3) {
      const getData = setTimeout(() => {
        axios
          .get(backendroute.getSearchByName + name, headersAuth(user.token))
          .then((response) => {
            setResult(response.data);
            console.log("response de searchByName", response);
          })
          .catch((error) => {
            console.log("error de getSearchName aqui", error);
            setResult("");
          });
    }, 300);

      return () => clearTimeout(getData);
    } else {
      setResult(""); // Reset the result if result is empty
    }
    // eslint-disable-next-line
  }, [name]);

  return (
    <SearchContainer>
      <input
        data-test="search"
        placeholder="Search for people"
        onChange={(event) => setName(event.target.value)}
      />
      <ResultSearchContaienr>
        {result.length > 0
          ? result.map((item) => (
              <ItemUserSearch
                data-test="user-search"
                key={item.id}
                onClick={() => onClick(item.id)}
              >
                <img src={item.pictureUrl} alt="usuario" />
                {item.username}
              </ItemUserSearch>
            ))
          : ""}
      </ResultSearchContaienr>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  width: 583px;
  height: 45px;

  input {
    width: 583px;
    height: 45px;
    border-radius: 6px;
    font-size: 19px;
    font-weight: 300;
    font-family: "Lato", sans-serif;
    @media (max-width: 600px) {
      display: none;
    }
  }
  @media(max-width: 625px) {
    display: none;
  }
`;

const ResultSearchContaienr = styled.div`
  background-color: #e7e7e7;
  position: relative;
  top: -14px;
  box-shadow: 0px -2px 0px 0px rgba(227, 224, 227, 1);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const ItemUserSearch = styled.div`
  padding: 15px;
  color: #515151;
  font-size: 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
