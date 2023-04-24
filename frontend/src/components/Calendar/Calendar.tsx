import React, { useState } from "react";
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
  Number,
  Sprout,
  Header,
} from "./style";

function Calendar() {
  const DATE_WEEK_LENGTH = 7;
  const TODAY = new Date();
  const SproutList = [
    <Sprout1 />,
    <Sprout2 />,
    <Sprout3 />,
    <Sprout4 />,
    <Sprout5 />,
  ];

  const [monthStart, setMonthStart] = useState(startOfMonth(TODAY));

  const generateOneWeek = (dateStart: Date, monthStart: Date) => {
    const daysOfWeek = [];
    let currentDay = dateStart;

    for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
      daysOfWeek.push({
        currentDay,
        formattedDate: format(currentDay, "d"),
        isToday: isSameDay(currentDay, TODAY),
        isCurrMonth: isSameMonth(currentDay, monthStart),
        sprout: SproutList[Math.floor(Math.random() * 4) + 1],
      });

      currentDay = addDays(currentDay, 1);
    }

    return daysOfWeek;
  };

  const currMonth = getMonth(monthStart);
  const weekLength = getWeeksInMonth(monthStart);
  const oneMonth = [];
  for (let i = 0; i < weekLength; i++) {
    const currentDate = addDays(monthStart, i * 7);
    const startDate = startOfWeek(currentDate);
    const oneWeek = generateOneWeek(startDate, monthStart);
    oneMonth.push(oneWeek);
  }

  const handelClickBackBtn = () => {
    setMonthStart(subMonths(monthStart, 1));
  };
  const handelClickPrevBtn = () => {
    setMonthStart(addMonths(monthStart, 1));
  };

  return (
    <MonthContainer>
      <Header>
        <BackArrow onClick={handelClickBackBtn} />
        {currMonth + 1}월
        <PrevArrow onClick={handelClickPrevBtn} />
      </Header>
      {oneMonth.map((month, i) => (
        <WeekContainer key={i}>
          {month.map((day, j) =>
            day.isCurrMonth ? (
              <DayContainer key={j}>
                <Number isToday={day.isToday}>{day.formattedDate}</Number>
                <Sprout>{day.sprout}</Sprout>
              </DayContainer>
            ) : (
              <DayContainer key={j} />
            )
          )}
        </WeekContainer>
      ))}
    </MonthContainer>
  );
}

export default Calendar;
