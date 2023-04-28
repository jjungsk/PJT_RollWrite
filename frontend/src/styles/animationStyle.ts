import { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    right: -100%;
  }
  to {
    right: 0;
  }
`;

const slideOut = keyframes`
  from {
    right: 0;
  }
  to {
    right: -100%;
  }
`;

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const fadeOut = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.6);
  }
  to {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export { slideIn, slideOut, fadeIn, fadeOut };
