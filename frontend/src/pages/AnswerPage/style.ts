import styled from "styled-components";

const NameContainer = styled.div`
  width: 100%;
  height: 4vh;
  margin: auto;
  font-size: 20px;
  color: var(--darkgray-color);
`;

const QuestionDiv = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 0 15px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 25px;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 300px;
  height: 15vh;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0.8;
  border: 1px solid #7A7E80;
  border-radius: 10px;
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 10%;
`;

export {
    NameContainer, 
    QuestionDiv,
    ImgContainer,
    BtnContainer
};
