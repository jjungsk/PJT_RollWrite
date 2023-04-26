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
  padding: 0px 16px;
  gap: 8px;

  font-size: 20px;
  font-weight: bold;
  width: 350px;

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

const DayContainer = styled.div<{
  isSwipeTop: boolean;
  isPicked: boolean;
  isPeriod?: boolean;
  color?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 46px;
  height: ${(props) => (props.isSwipeTop ? "32px" : "52px")};
  border: ${(props) =>
    props.isPicked ? "1px solid var(--darkgray-color)" : ""};
  border-radius: 4px;
  background-color: ${(props) => (props.isPeriod ? props.color : "")};
  @media (height < 700px) {
    height: ${(props) => (props.isSwipeTop ? "36px" : "50px")};
  }
`;

const NumberContainer = styled.div<{
  isToday: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.isToday ? "var(--main-color)" : "")};
  border-radius: 16px;
  font-size: 16px;
  cursor: pointer;

  @media (height < 700px) {
    height: 26px;
    width: 26px;
  }
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
    padding: 8px 30px 0px;
  }
`;

const PickedQuestion = styled.div`
  display: flex;
  text-align: start;
  padding: 24px 30px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;

  @media (height < 700px) {
    font-size: 16px;
    padding: 12px 30px;
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
