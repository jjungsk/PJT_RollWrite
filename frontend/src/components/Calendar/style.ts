import styled from "styled-components";

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px;
  gap: 8px;

  font-size: 20px;
  font-weight: bold;
`;
const WeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;
const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 46px;
  height: 52px;
`;

const NumberContainer = styled.div<{ isToday: boolean }>`
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

export {
  MonthContainer,
  WeekContainer,
  DayContainer,
  NumberContainer,
  SproutContainer,
  Header,
};
