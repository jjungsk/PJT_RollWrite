import styled from "styled-components";

const ResultContainer = styled.div`
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: scroll;

  & > div:last-child {
    height: calc(100vh - 530px);
  }
`;

export { ResultContainer };
