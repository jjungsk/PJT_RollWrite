import styled from "styled-components";

const LogoContainer = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 45%;

  svg {
    width: 285px;
    height: 133px;
    cursor: default;
  }

  p {
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    align-items: center;
    text-align: center;
    margin-block: 50px;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 60px;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0);

  svg {
    width: 100%;
    height: 100%;
  }
`;

export { LogoContainer, BtnContainer };
