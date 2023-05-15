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
  addMonths,
  subMonths,
} from "date-fns";
import { CalendarQuestion, Group } from "../../../constants/types";
import Box from "../../Atom/Box/Box";
import { DOG_LIST, SPROUT_LIST } from "../../../constants/sprout";
import { toast } from "react-hot-toast";
import { swipeDirection } from "../../../utils/swipeDetector";
import { initTouch } from "../../../utils/swipeDetector";

const TODAY = new Date();

function createOneWeek(startDate: Date, monthStart: Date) {
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const currentDay = addDays(startDate, i);
    return {
      currentDay,
      formattedDate: isSameMonth(currentDay, monthStart)
        ? format(currentDay, "d")
        : "",
      isToday: isSameDay(currentDay, TODAY),
      isCurrMonth: isSameMonth(currentDay, monthStart),
    };
  });
  return daysOfWeek;
}

function createCalendar(monthStart: Date) {
  const weekLength = getWeeksInMonth(monthStart);
  const daysOfMonth = Array.from({ length: weekLength }, (_, i) => {
    const currentDate = addDays(monthStart, i * 7);
    const startDate = startOfWeek(currentDate);
    return createOneWeek(startDate, monthStart);
  });
  return daysOfMonth;
}

interface Props {
  group: Group;
  questionMap: Map<string, CalendarQuestion>;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  calendarRef: React.RefObject<HTMLDivElement>;
}

function Calendar({
  questionMap,
  group,
  setSelectedDay,
  selectedDay,
  calendarRef,
}: Props) {
  const [monthStart, setMonthStart] = useState(startOfMonth(TODAY));
  const daysOfMonth = useMemo(() => createCalendar(monthStart), [monthStart]);
  const SproutThema = group.color === "#CEEDC7" ? SPROUT_LIST : DOG_LIST;
  const handelClick = (day: Date) => {
    ((isAfter(day, new Date(group?.startDay)) &&
      isBefore(day, new Date(group?.endDay)) &&
      isSameMonth(day, monthStart)) ||
      isSameDay(day, new Date(group?.startDay))) &&
    isSameMonth(day, monthStart)
      ? setSelectedDay(day)
      : toast.error("모임 기간이 아닙니다");
  };

  const isDayInGroupPeriod = (day: Date) => {
    const startDay = new Date(group?.startDay);
    const endDay = new Date(group?.endDay);
    return (
      (isAfter(day, startDay) &&
        isBefore(day, endDay) &&
        isSameMonth(day, monthStart)) ||
      isSameDay(day, startDay)
    );
  };
  const getSproutImage = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    if (questionMap.has(formattedDate)) {
      return SproutThema[(questionMap.get(formattedDate)?.rate ?? 20) / 20];
    }
    return SproutThema[0];
  };

  return (
    <>
      <CalendarContainer ref={calendarRef}>
        <CalendarMonth
          onTouchStart={initTouch}
          onTouchMove={(e) =>
            swipeDirection(
              e,
              () => {},
              () => {},
              () => {
                setMonthStart(addMonths(monthStart, 1));
              },
              () => {
                setMonthStart(subMonths(monthStart, 1));
              }
            )
          }
          onMouseDown={initTouch}
          onMouseMove={(e) => swipeDirection(e)}
        >
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
                {isDayInGroupPeriod(day.currentDay) &&
                isSameMonth(day.currentDay, monthStart) ? (
                  getSproutImage(day.currentDay)
                ) : (
                  <Box width="32px" height="32px" />
                )}
              </CalendarDay>
            ))}
          </CalendarWeek>
        ))}
      </CalendarContainer>
    </>
  );
}

export default Calendar;
