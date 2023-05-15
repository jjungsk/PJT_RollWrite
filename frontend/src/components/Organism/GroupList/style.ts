import styled from "styled-components";

const GroupListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 360px);
  overflow-y: scroll;

  & > div {
    width: 100%;
    margin: auto;
  }

  & > div:first-child > div {
    margin-top: 10px;
  }

  & > div:last-child {
    width: 100%;
    height: calc(100vh - 480px);
  }
`;

export { GroupListContainer };
