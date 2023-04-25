import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 237, 230);
  display: flex;
  flex-direction: column;
`;

const DateDiv = styled.div`
  width: 100vw;
  font-size: 18px;
  color: var(--darkgray-color);
  text-align: center;
`;

const NameDiv = styled.div`
  width: 100vw;
  font-size: 20px;
  color: var(--black-color);
  text-align: center;
`;


export { Wrapper, DateDiv, NameDiv };