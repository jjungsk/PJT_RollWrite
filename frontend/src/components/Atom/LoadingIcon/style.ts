import styled from "styled-components";

const LoadingIconWrap = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  display: inline-block;
  overflow: hidden;
  background: none;
`;

const LoadingIconSmallWrap = styled.div`
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: none;
`;

const LoadingIconContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */

  div {
    box-sizing: content - box;
  }

  & > div:nth-child(1) {
    display: block;
  }
  & > div:nth-child(1) div {
    position: absolute;
    top: 138px;
    left: -12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #54bd3c;
    animation: animation-loading-icon-3 0.3333333333333333s linear infinite;
  }
  & > div:nth-child(1) div:nth-child(1) {
    animation-delay: -2.0100000000000002s;
  }
  & > div:nth-child(1) div:nth-child(2) {
    animation-delay: -0.99s;
  }
  & > div:nth-child(1) div:nth-child(3) {
    animation-delay: 0s;
  }

  & > div:nth-child(2) {
    transform: translate(-15px, 0);
  }
  & > div:nth-child(2) div {
    position: absolute;
    top: 60px;
    left: 60px;
    width: 180px;
    height: 90px;
    border-radius: 180px 180px 0 0;
    background: #f9aa4c;
    animation: animation-loading-icon-1 0.3333333333333333s linear infinite;
    transform-origin: 90px 90px;
  }
  & > div:nth-child(2) div:nth-child(2) {
    animation: animation-loading-icon-2 0.3333333333333333s linear infinite;
  }
  & > div:nth-child(2) div:nth-child(3) {
    transform: rotate(-90deg);
    animation: none;
  }

  @keyframes animation-loading-icon-1 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes animation-loading-icon-2 {
    0% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(225deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes animation-loading-icon-3 {
    0% {
      transform: translate(285px, 0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translate(105px, 0);
      opacity: 1;
    }
  }
`;

const LoadingIconSmallContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    box-sizing: content - box;
  }

  & > div:nth-child(1) {
    display: block;
  }
  & > div:nth-child(1) div {
    position: absolute;
    top: 46px;
    left: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ec472b;
    animation: animation-loading-icon-3 0.5s linear infinite;
  }
  & > div:nth-child(1) div:nth-child(1) {
    animation-delay: -1.34s;
  }
  & > div:nth-child(1) div:nth-child(2) {
    animation-delay: -0.66s;
  }
  & > div:nth-child(1) div:nth-child(3) {
    animation-delay: 0s;
  }

  & > div:nth-child(2) {
    transform: translate(-15px, 0);
  }
  & > div:nth-child(2) div {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 60px;
    height: 30px;
    border-radius: 60px 60px 0 0;
    background: #f8b26a;
    animation: animation-loading-icon-1 0.5s linear infinite;
    transform-origin: 30px 30px;
  }
  & > div:nth-child(2) div:nth-child(2) {
    animation: animation-loading-icon-2 0.5s linear infinite;
  }
  & > div:nth-child(2) div:nth-child(3) {
    transform: rotate(-90deg);
    animation: none;
  }

  @keyframes animation-loading-icon-1 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes animation-loading-icon-2 {
    0% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(225deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes animation-loading-icon-3 {
    0% {
      transform: translate(95px, 0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translate(35px, 0);
      opacity: 1;
    }
  }
`;

const LoadingText = styled.div`
  position: absolute;
  top: 45%;
  width: 100%;
  transform: translate(0, 130px);
  font-size: 24px;
  font-weight: bold;
  animation: blink-effect 0.7s step-end infinite;

  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }

  @media all and (min-width: 768px) {
    font-size: 36px;
  }
`;

export {
  LoadingIconWrap,
  LoadingIconSmallWrap,
  LoadingIconContainer,
  LoadingIconSmallContainer,
  LoadingText,
};
