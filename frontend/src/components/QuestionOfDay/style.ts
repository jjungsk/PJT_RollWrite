import styled from "styled-components";

const QuestionOfDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin: auto;
  width: 300px;
  gap: 12px;

  @media (height < 700px) {
    gap: 10px;
  }
`;

const QuestionOfDayHeader = styled.div`
  font-size: 16px;
  color: var(--darkgray-color);

  @media (height < 700px) {
    font-size: 14px;
  }
`;

const QuestionOfDayContent = styled.div`
  font-size: 20px;
  color: var(--black-color);

  @media (height < 700px) {
    font-size: 16px;
  }
`;

const QuestionOfDayFooter = styled.div`
  margin: 12px;
  text-align: center;

  @media (height < 700px) {
    margin: 8px;
  }
`;

export {
  QuestionOfDayContainer,
  QuestionOfDayHeader,
  QuestionOfDayContent,
  QuestionOfDayFooter,
};
