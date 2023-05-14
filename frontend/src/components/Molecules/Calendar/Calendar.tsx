import React, { useMemo, useState } from "react";
import {
  CalendarContainer,
  CalendarDay,
  CalendarDayNum,
  CalendarMonth,
  CalendarName,
  CalendarWeek,
} from "./style";
import {
  format,
  isSameDay,
  isSameMonth,
  addDays,
  startOfWeek,
  getWeeksInMonth,
  startOfMonth,
  getMonth,
  getYear,
  isAfter,
  isBefore,
} from "date-fns";
import { CalendarQuestion, Group } from "../../../constants/types";
import Box from "../../Atom/Box/Box";
import { SPROUT_LIST } from "../../../constants/sprout";
import { toast } from "react-hot-toast";

const TODAY = new Date();

function createOneWeek(startDate: Date, monthStart: Date) {
  const daysOfWeek = [];
  let currentDay = startDate;

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push({
      currentDay,
      formattedDate: isSameMonth(currentDay, monthStart)
        ? format(currentDay, "d")
        : "",
      isToday: isSameDay(currentDay, TODAY),
      isCurrMonth: isSameMonth(currentDay, monthStart),
    });

    currentDay = addDays(currentDay, 1);
  }

  return daysOfWeek;
}
function createCalendar(monthStart: Date) {
  const weekLength = getWeeksInMonth(monthStart);
  const daysOfMonth = [];
  for (let i = 0; i < weekLength; i++) {
    const currentDate = addDays(monthStart, i * 7);
    const startDate = startOfWeek(currentDate);
    const oneWeek = createOneWeek(startDate, monthStart);
    daysOfMonth.push(oneWeek);
  }
  return daysOfMonth;
}
interface Props {
  group: Group;
  questionMap: Map<string, CalendarQuestion>;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}
function Calendar({ questionMap, group, setSelectedDay, selectedDay }: Props) {
  const [monthStart, setMonthStart] = useState(startOfMonth(TODAY));
  const daysOfMonth = useMemo(() => createCalendar(monthStart), [monthStart]);

  const handelClick = (day: Date) => {
    ((isAfter(day, new Date(group?.startDay)) &&
      isBefore(day, new Date(group?.endDay)) &&
      isSameMonth(day, monthStart)) ||
      isSameDay(day, new Date(group?.startDay))) &&
    isSameMonth(day, monthStart)
      ? setSelectedDay(day)
      : toast.error("모임 기간이 아닙니다");
  };
  return (
    <CalendarContainer>
      <CalendarMonth>
        {getYear(monthStart)}년 {getMonth(monthStart) + 1}월
      </CalendarMonth>
      <CalendarName>
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </CalendarName>
      {daysOfMonth.map((week, i) => (
        <CalendarWeek key={i}>
          {week.map((day, i) => (
            <CalendarDay key={i} onClick={() => handelClick(day.currentDay)}>
              <CalendarDayNum isSeleted={selectedDay === day.currentDay}>
                {day.formattedDate}
              </CalendarDayNum>
              {group &&
              ((isAfter(day.currentDay, new Date(group?.startDay)) &&
                isBefore(day.currentDay, new Date(group?.endDay)) &&
                isSameMonth(day.currentDay, monthStart)) ||
                isSameDay(day.currentDay, new Date(group?.startDay))) &&
              isSameMonth(day.currentDay, monthStart) ? (
                questionMap.has(format(day.currentDay, "yyyy-MM-dd")) ? (
                  SPROUT_LIST[
                    (questionMap.get(format(day.currentDay, "yyyy-MM-dd"))
                      ?.rate ?? 20) / 20
                  ]
                ) : (
                  SPROUT_LIST[0]
                )
              ) : (
                <Box width="32px" height="32px" />
              )}
            </CalendarDay>
          ))}
        </CalendarWeek>
      ))}
    </CalendarContainer>
  );
}

export default Calendar;
