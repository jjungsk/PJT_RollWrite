import styled from "styled-components";

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  min-height: 222px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  font-size: 20px;
  font-weight: bold;
  width: 100%;

  > div {
    width: 44px;
  }
`;
const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;
const DayContainer = styled.div<{ isSwipeTop: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 46px;
  height: ${(props) => (props.isSwipeTop ? "32px" : "52px")};

  @media (height < 700px) {
    height: ${(props) => (props.isSwipeTop ? "32px" : "50px")};
  }
`;

const NumberContainer = styled.div<{
  isToday: boolean;
  isPicked: boolean;
  themaColor: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.isPicked
      ? "var(--main-color)"
      : props.isToday
      ? props.themaColor
      : ""};
  border-radius: 16px;
  font-size: 16px;

  cursor: pointer;
`;

const SproutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 16px;
  height: 16px;
`;

const PickedDay = styled.div`
  display: flex;
  text-align: start;
  padding: 16px 30px 0px;
  width: 100%;

  font-size: 16px;
  color: var(--darkgray-color);

  @media (height < 700px) {
    font-size: 14px;
    padding: 12px 30px 0px;
  }
`;

const PickedQuestion = styled.div`
  display: flex;
  text-align: start;
  padding: 16px 30px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;

  @media (height < 700px) {
    font-size: 16px;
    padding: 10 px 30px;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (height < 700px) {
    > button {
      font-size: 16px;
      width: 112px;
      height: 40px;
    }
  }
`;

export {
  MonthContainer,
  WeekContainer,
  DayContainer,
  NumberContainer,
  SproutContainer,
  Header,
  PickedDay,
  PickedQuestion,
  QuestionContainer,
};
