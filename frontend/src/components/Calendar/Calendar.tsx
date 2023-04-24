import React, { useMemo, useState } from "react";
import { ReactComponent as Sprout1 } from "../../assets/Sprout_1.svg";
import { ReactComponent as Sprout2 } from "../../assets/Sprout_2.svg";
import { ReactComponent as Sprout3 } from "../../assets/Sprout_3.svg";
import { ReactComponent as Sprout4 } from "../../assets/Sprout_4.svg";
import { ReactComponent as Sprout5 } from "../../assets/Sprout_5.svg";
import { ReactComponent as BackArrow } from "../../assets/Back_Arrow.svg";
import { ReactComponent as PrevArrow } from "../../assets/Prev_Arrow.svg";
import {
  format,
  isSameDay,
  isSameMonth,
  addDays,
  getMonth,
  startOfMonth,
  startOfWeek,
  getWeeksInMonth,
  addMonths,
  subMonths,
} from "date-fns";
import {
  MonthContainer,
  WeekContainer,
  DayContainer,
  SproutContainer,
  NumberContainer,
  Header,
  PickedDay,
  PickedQuestion,
} from "./style";
import { ko } from "date-fns/locale";

const DATE_WEEK_LENGTH = 7;
const TODAY = new Date();
const sproutList = [
  <Sprout1 />,
  <Sprout2 />,
  <Sprout3 />,
  <Sprout4 />,
  <Sprout5 />,
];

function generateOneWeek(dateStart: Date, monthStart: Date) {
  const daysOfWeek = [];
  let currentDay = dateStart;

  for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
    daysOfWeek.push({
      currentDay,
      formattedDate: format(currentDay, "d"),
      isToday: isSameDay(currentDay, TODAY),
      isCurrMonth: isSameMonth(currentDay, monthStart),
      sprout: sproutList[Math.floor(Math.random() * 4) + 1],
    });

    currentDay = addDays(currentDay, 1);
  }

  return daysOfWeek;
}

function makeCalendar(monthStart: Date) {
  const weekLength = getWeeksInMonth(monthStart);
  const daysOfMonth = [];
  for (let i = 0; i < weekLength; i++) {
    const currentDate = addDays(monthStart, i * 7);
    const startDate = startOfWeek(currentDate);
    const oneWeek = generateOneWeek(startDate, monthStart);
    daysOfMonth.push(oneWeek);
  }

  return daysOfMonth;
}

function Calendar() {
  const [monthStart, setMonthStart] = useState(startOfMonth(TODAY));
  const [pickedDay, setPickedDay] = useState(TODAY);

  const handelClickBackBtn = () => {
    setMonthStart(subMonths(monthStart, 1));
  };
  const handelClickPrevBtn = () => {
    setMonthStart(addMonths(monthStart, 1));
  };
  const handelClickDay = (day: Date) => {
    setPickedDay(day);
  };

  const daysOfMonth = useMemo(() => makeCalendar(monthStart), [monthStart]);

  return (
    <MonthContainer>
      <Header>
        <BackArrow onClick={handelClickBackBtn} />
        {getMonth(monthStart) + 1}월
        <PrevArrow onClick={handelClickPrevBtn} />
      </Header>
      {daysOfMonth.map((month, i) => (
        <WeekContainer key={i}>
          {month.map((day, j) =>
            day.isCurrMonth ? (
              <DayContainer
                key={j}
                onClick={() => handelClickDay(day.currentDay)}
              >
                <NumberContainer isToday={day.isToday}>
                  {day.formattedDate}
                </NumberContainer>
                <SproutContainer>{day.sprout}</SproutContainer>
              </DayContainer>
            ) : (
              <DayContainer key={j} />
            )
          )}
        </WeekContainer>
      ))}
      <PickedDay>{format(pickedDay, "PPP", { locale: ko })}</PickedDay>
      <PickedQuestion>
        프로젝트를 하면서 가장 특별했던 순간이 무엇인가요?
      </PickedQuestion>
    </MonthContainer>
  );
}

export default Calendar;
