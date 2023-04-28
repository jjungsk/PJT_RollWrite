import styled from "styled-components";
import {
  fadeIn,
  fadeOut,
  slideIn,
  slideOut,
} from "../../styles/animationStyle";

const SideMenuBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) =>
    props.isOpen ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)"};
  z-index: 999;

  animation-name: ${(props) => (props.isOpen ? fadeIn : fadeOut)};
  animation-duration: 0.4s;
`;

const SideMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-100%")};
  width: 260px;
  height: 100vh;
  background: var(--bg-color);
  border-radius: 10px 0px 0px 10px;

  animation-name: ${(props) => (props.isOpen ? slideIn : slideOut)};
  animation-duration: 0.4s;
`;

export { SideMenuBackground, SideMenuContainer };
