import styled from "styled-components";

const CalendarDay = styled.div<{
  isSwipeTop?: boolean;
  isPicked?: boolean;
  isGroup?: boolean;
  color?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: ${(props) =>
    props.isPicked ? "1px solid var(--darkgray-color)" : ""};
  background-color: ${(props) => (props.isGroup ? props.color : "")};
  border-radius: 4px;
  width: 46px;
  height: ${(props) => (props.isSwipeTop ? "32px" : "50px")};

  > svg {
    height: ${(props) => (props.isSwipeTop ? "2px" : "16px")};
    width: ${(props) => (props.isSwipeTop ? "24px" : "16px")};
  }

  > div {
    width: 28px;
    height: 28px;
    line-height: 28px;
  }
`;

const CalendarWeek = styled.div`
  display: flex;
  flex-direction: row;
`;

const CalendarMonth = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 320px;
`;

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  height: 30px;

  > div {
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export {
  CalendarDay,
  CalendarWeek,
  CalendarMonth,
  CalendarContainer,
  CalendarHeader,
};
