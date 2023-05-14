import styled from "styled-components";

const QuestionPageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4vh;
`;
const QuestionPageHeader = styled.div`
  font-size: 18px;
  color: var(--darkgray-color);
  align-items: center;

  & > div {
    display: flex;
    justify-content: center;
    line-height: 24px;
    height: 24px;
    gap: 1px;
  }
`;

const QuestionPageQuestion = styled.div`
  padding: 0px 16px;
  line-height: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const QuestionPageAnswer = styled.div`
  padding: 0px 16px;
  word-break: break-all;
`;

export {
  QuestionPageContainer,
  QuestionPageHeader,
  QuestionPageQuestion,
  QuestionPageAnswer,
};
