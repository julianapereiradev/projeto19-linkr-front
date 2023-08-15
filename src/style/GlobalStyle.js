import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Oswald', sans-serif;
        font-family: 'Passion One', cursive;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }
    body {
      background-color: #363636;
    }

    button {
        cursor: pointer;
        background-color: #1877F2;
        border: none;
        color: #FFFFFF;
        font-family: 'Oswald', sans-serif;
        border-radius: 6px;

    @media (min-width: 768px) {
      height: 65px;
    }
    }

    input {
        width: 100%;
        height: 55px;
        border-radius: 6px;
        font-family: 'Oswald', sans-serif;
        font-size: 22px;
        font-weight: bold;
        padding-left: 10px;
        margin-bottom: 10px;
        border: none;

        &::placeholder {
            color: #9F9F9F;
        }

    @media (min-width: 768px) {
      height: 65px;
    }
    }
`;

export default GlobalStyle;
