import styled from "styled-components";

const SideMenuContainer = styled.div`
  & > div:first-child {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;
  }

  & > div:last-child {
    position: absolute;
    top: 0;
    width: 260px;
    height: 100vh;
    background: var(--bg-color);
    border-radius: 10px 0px 0px 10px;
    z-index: 999;
  }
`;

const SideMenuHeader = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px;
  align-items: end;

  svg {
    cursor: pointer;
  }
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-block: 12px;

  & > div:first-child {
    margin-inline: 15px 30px;
  }
`;

export { SideMenuContainer, SideMenuHeader, ProfileItem };
