import styled from "styled-components";

const ResultAwardContainer = styled.div`
  width: 90%;
  padding: 10px;
  margin: 20px auto;
  word-break: keep-all;
`;

const ResultAwardUserList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;

  & > div {
    margin: 8px;
  }
`;

export { ResultAwardContainer, ResultAwardUserList };
