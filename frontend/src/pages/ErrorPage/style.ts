import styled from "styled-components";

const ErrorPageContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    margin-bottom: 20px;
  }

  p {
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 70px;
  }
`;

export { ErrorPageContainer };
