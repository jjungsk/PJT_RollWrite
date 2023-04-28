import styled from "styled-components";

const SideMenuBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SideMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 260px;
  height: 100vh;
  background: var(--bg-color);
  border-radius: 10px 0px 0px 10px;
`;

export { SideMenuBackground, SideMenuContainer };
