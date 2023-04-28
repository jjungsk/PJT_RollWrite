import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 128px);
  font-size: 26px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  > .title {
    margin-top: 16px;
  }
  > .subTitle {
    margin-top: 4px;
    margin-bottom: 64px;
  }
  > button {
    margin: 8px;
  }
`;

export { InfoContainer };
