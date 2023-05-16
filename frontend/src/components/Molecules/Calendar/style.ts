import styled from "styled-components";

const CalendarDay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 40px;
`;

const CalendarWeek = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  width: 100%;

  font-size: 14px;
`;

const CalendarName = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  width: 100%;
  justify-content: space-between;
  padding: 0px 24px;

  & > div {
    font-size: 14px;
    width: 40px;
  }
`;

const CalendarMonth = styled.div`
  height: 28px;
  line-height: 28px;
  margin-bottom: 28px;
  font-weight: bold;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  font-size: 16px;
  color: var(--darkgray-color);
`;

const CalendarDayNum = styled.div<{ isSeleted: boolean }>`
  border-radius: 16px;
  width: 40px;
  color: ${(props) => (props.isSeleted ? "var(--white-color)" : "")};
  background-color: ${(props) => (props.isSeleted ? "var(--main-color)" : "")};
  height: 18px;
  line-height: 18px;
`;

export {
  CalendarDay,
  CalendarWeek,
  CalendarMonth,
  CalendarContainer,
  CalendarName,
  CalendarDayNum,
};
