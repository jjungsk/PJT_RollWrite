import styled, { css } from "styled-components";

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

const ImgContainer = styled.div<{ BgImg: string }>`
  display: flex;
  width: 300px;
  height: 15vh;
  margin: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid #7a7e80;
  border-radius: 10px;
  position: relative;
  background-color: rgb(0, 0, 0, 0.4);
  background-position: center;
  ${(props: any) =>
    props.BgImg &&
    css`
      background-image: url(${props.BgImg});
      background-size: cover;
    `}
`;

const IconContainer = styled.div`
  position: absolute;
  width: 100%;
`;

const TextContainer = styled.div`
  margin: auto;
`;

const ContentContainer = styled.textarea`
  width: 300px;
  height: 40vh;
  background: var(--lightgray-color);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  padding: 15px;
  font-size: 16px;
  margin-block: 15px;
`;

export {
  NameContainer,
  QuestionDiv,
  ImgContainer,
  IconContainer,
  TextContainer,
  ContentContainer,
};
