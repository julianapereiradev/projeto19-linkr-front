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
      background-color: #fff;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
