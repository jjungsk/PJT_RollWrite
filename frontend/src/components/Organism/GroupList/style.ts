import styled from "styled-components";

const GroupListContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 10px;
  overflow-y: scroll;

  & > div {
    width: 100%;
    margin: auto;
  }

  & > div:first-child > div {
    margin-top: 10px;
  }
`;

export { GroupListContainer };
