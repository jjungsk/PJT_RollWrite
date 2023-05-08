import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "IM_Hyemin";
    font-weight: normal;
    font-style: normal;
    src: url("/IM_Hyemin-Regular.woff2") format("woff");
  }

  @font-face {
    font-family: "Tossface";
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url("/TossFaceFontMac.woff2") format("woff");
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

   .splitting .char {
	 animation: slide-in 1s cubic-bezier(0.17, 0.84, 0.4, 1.49) both;
	 animation-delay: calc(30ms * var(--char-index));
   }
   @keyframes slide-in {
      0% {
      transform: scale(2) rotate(60deg);
      opacity: 0;
      }
    }
   @keyframes bump-in {
      0% {
      transform: scale(0);
      opacity: 0;
      }
   }
    particule {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      box-shadow: 1px 1px 4px #eb6383;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .toastModal {
      padding-top: 8px;
      width: 300px;
      height: 104px;
      background-color: var(--lightgray-color);
      justify-content: space-around;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      animation: fadeIn 0.5s;


      font-size: 16px;
      font-weight: bold; 

      & > div > button {
        border-radius: 4px;
        margin: 8px;
        padding: 4px;
        width: 64px;
        font-size: 14px;
        font-weight: bold; 
      }
    }

    .yesBtn {
      background-color: var(--blue-color);
    }
    .noBtn {
      background-color: var(--orange-color);
    }
`;

export { GlobalStyle };
