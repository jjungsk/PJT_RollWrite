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
    --bg-color: #F0EDE6;
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
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    font-family: 'IM_Hyemin', -apple-system, Helvetica Neue, sans-serif;
    /* 드래그 방지, 우클릭 방지 */
    -webkit-touch-callout: none;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  #root {
    position: relative;
    width: 100vw;
    min-width: 360px;
    max-width: 450px;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    background-color: var(--bg-color);
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
  svg { 
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  /* 영역 클릭시 생기는 하이라이트 제거*/
  div:focus,
  div:hover,
  span:focus,
  span:hover,
  label:focus,
  label:hover,
  input:focus,
  input:hover,
  a:focus,
  a:hover,
  button:focus,
  button:hover {
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

export { GlobalStyle };
