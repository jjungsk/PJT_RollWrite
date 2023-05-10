import styled from "styled-components";

const QuestionOfDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin: auto;
  width: 300px;
  gap: 12px;

  @media (height < 700) {
    gap: 10px;
  }
`;

const QuestionOfDayHeader = styled.div`
  font-size: 16px;
  color: var(--darkgray-color);

  @media (height < 700) {
    font-size: 14px;
  }
`;

const QuestionOfDayContent = styled.div`
  font-size: 20px;
  line-height: 28px;
  color: var(--black-color);

  @media (height < 700) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const QuestionOfDayFooter = styled.div`
  margin: 12px;
  text-align: center;

  @media (height < 700) {
    margin: 8px;
  }
`;

export {
  QuestionOfDayContainer,
  QuestionOfDayHeader,
  QuestionOfDayContent,
  QuestionOfDayFooter,
};
