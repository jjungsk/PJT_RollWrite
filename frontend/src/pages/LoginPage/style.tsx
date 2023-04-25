import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 237, 230);
  display: flex;
  flex-direction: column;
`;

const TextDiv = styled.div`
  width: 100%;
  height: 56px;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  align-items: center;
  text-align: center;
  margin-block: 70px;
`;

const BtnDiv = styled.div`
  width: 100%;
  margin-inline: auto;
`;

export { Wrapper, TextDiv, BtnDiv };