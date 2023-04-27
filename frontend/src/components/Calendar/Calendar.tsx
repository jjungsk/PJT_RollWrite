import React, { useMemo, useState } from "react";
import { ReactComponent as Sprout1 } from "../../assets/Sprout_1.svg";
import { ReactComponent as Sprout2 } from "../../assets/Sprout_2.svg";
import { ReactComponent as Sprout3 } from "../../assets/Sprout_3.svg";
import { ReactComponent as Sprout4 } from "../../assets/Sprout_4.svg";
import { ReactComponent as Sprout5 } from "../../assets/Sprout_5.svg";
import { ReactComponent as MiniSprout } from "../../assets/MiniSprout.svg";
import { ReactComponent as BackArrow } from "../../assets/Back_Arrow.svg";
import { ReactComponent as PrevArrow } from "../../assets/Prev_Arrow.svg";
import {
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarMonth,
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
  subMonths,
  addMonths,
  isAfter,
  isBefore,
} from "date-fns";
import { initTouch, swipeDirection } from "../../apis/swipeDetector";
import { GroupInfo } from "../../constants/types";

const SPROUT_LIST = [
  <svg />,
  <Sprout1 />,
  <Sprout2 />,
  <Sprout3 />,
  <Sprout4 />,
  <Sprout5 />,
];
const SPROUT_CLOLR_LIST = [
  "#F0EDE6",
  "#FF9847",
  "#3F942C",
  "#916F66",
  "#CF6F49",
  "#FFDC00",
];

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
      sprout: isSameMonth(currentDay, monthStart)
        ? Math.floor(Math.random() * 4) + 1
        : 0,
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
  isSwipeTop?: boolean;
  setIsSwipeTop?: React.Dispatch<React.SetStateAction<boolean>>;
  pickedDay?: Date;
  setPickedDay?: React.Dispatch<React.SetStateAction<Date>>;
  groupInfo?: GroupInfo;
  questionMap?: Map<string, string>;
}
function Calendar({
  isSwipeTop,
  setIsSwipeTop,
  pickedDay,
  setPickedDay,
  groupInfo,
  questionMap,
}: Props) {
  const [monthStart, setMonthStart] = useState(startOfMonth(TODAY));

  const daysOfMonth = useMemo(() => createCalendar(monthStart), [monthStart]);

  const handelClickBackBtn = () => {
    setMonthStart(subMonths(monthStart, 1));
  };
  const handelClickPrevBtn = () => {
    setMonthStart(addMonths(monthStart, 1));
  };
  return (
    <CalendarContainer
      onTouchStart={initTouch}
      onTouchMove={(e) =>
        swipeDirection(
          e,
          () => setIsSwipeTop?.(true),
          () => setIsSwipeTop?.(false)
        )
      }
      onMouseDown={initTouch}
      onMouseMove={(e) =>
        swipeDirection(
          e,
          () => setIsSwipeTop?.(true),
          () => setIsSwipeTop?.(false)
        )
      }
    >
      <CalendarHeader>
        <BackArrow onClick={handelClickBackBtn} />
        <div>{getMonth(monthStart) + 1}월</div>
        <PrevArrow onClick={handelClickPrevBtn} />
      </CalendarHeader>
      <CalendarMonth>
        {daysOfMonth.map((week, i) => (
          <CalendarWeek key={i}>
            {week.map((day, i) => (
              <CalendarDay
                key={i}
                isSwipeTop={isSwipeTop}
                isGroup={
                  groupInfo &&
                  ((isAfter(day.currentDay, new Date(groupInfo?.startDay)) &&
                    isBefore(day.currentDay, new Date(groupInfo?.endDay)) &&
                    isSameMonth(day.currentDay, monthStart)) ||
                    isSameDay(day.currentDay, new Date(groupInfo?.startDay)))
                }
                color={groupInfo?.color}
                isPicked={day.currentDay === pickedDay}
                onClick={() => setPickedDay?.(day.currentDay)}
              >
                <div>{day.formattedDate}</div>
                {questionMap?.has(format(day.currentDay, "yyyy-MM-dd")) ? (
                  isSwipeTop ? (
                    <MiniSprout fill={SPROUT_CLOLR_LIST[day.sprout]} />
                  ) : (
                    SPROUT_LIST[day.sprout]
                  )
                ) : (
                  SPROUT_LIST[0]
                )}
              </CalendarDay>
            ))}
          </CalendarWeek>
        ))}
      </CalendarMonth>
    </CalendarContainer>
  );
}

export default Calendar;
