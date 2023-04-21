import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'IM_Hyemin';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Regular.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
  }


  :root {
    /* Colors */
    --black-color:#1E1E1E;
    --darkgray-color:#7A7E80;
    --gray-color:#DADADA;
    --lightgray-color:#F4F4F4;
    --white-color:#FFFFFF;
    --main-color:#F9AA4C;
    --sub-color:#CBC7BA;
    --orange-color:#FFD4B2;
    --yellow-color:#FFF6BD;
    --green-color:#CEEDC7;
    --blue-color:#D1D9F8;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  *::-webkit-scrollbar{
    width: 0px;
  } 
  
  html, body {
    width: 100%;
    height: 100%;
    font-family: 'IM_Hyemin', -apple-system, Helvetica Neue, sans-serif;
  }
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
  }
  input {
    border: none;
    background-color: inherit;
  }
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  abbr {
    text-decoration: none;
  }
  a,
  div,
  span,
  input,
  button,
  textarea {
    font-family: inherit;
  }
`;

export { GlobalStyle };
