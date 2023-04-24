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
import GhostBtn from "../../elements/Button/GhostBtn";

const DATE_WEEK_LENGTH = 7;
const TODAY = new Date();
const sproutList = [
  <Sprout1 />,
  <Sprout2 />,
  <Sprout3 />,
  <Sprout4 />,
  <Sprout5 />,
];
const sproutColorList = ["#FF9847", "#3F942C", "#916F66", "#CF6F49", "#FFDC00"];

function generateOneWeek(dateStart: Date, monthStart: Date) {
  const daysOfWeek = [];
  let currentDay = dateStart;

  for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
    daysOfWeek.push({
      currentDay,
      formattedDate: format(currentDay, "d"),
      isToday: isSameDay(currentDay, TODAY),
      isCurrMonth: isSameMonth(currentDay, monthStart),
      sprout: Math.floor(Math.random() * 4) + 1,
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
  const [isSwipeTop, setIsSwipeTop] = useState(false);

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

  // 스와이프 감지
  let initialX: number | null = null;
  let initialY: number | null = null;

  function initTouch(e: MouseEvent | TouchEvent) {
    const touchEvent = e as TouchEvent;
    initialX = touchEvent.touches
      ? touchEvent.touches[0].clientX
      : (e as MouseEvent).clientX;
    initialY = touchEvent.touches
      ? touchEvent.touches[0].clientY
      : (e as MouseEvent).clientY;
  }

  function swipeDirection(e: MouseEvent | TouchEvent) {
    if (initialX !== null && initialY !== null) {
      const touchEvent = e as TouchEvent;
      const currentX = touchEvent.touches
        ? touchEvent.touches[0].clientX
        : (e as MouseEvent).clientX;
      const currentY = touchEvent.touches
        ? touchEvent.touches[0].clientY
        : (e as MouseEvent).clientY;

      let diffX = initialX - currentX;
      let diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        diffX > 0 ? console.log("to left") : console.log("to right");
      } else {
        diffY > 0 ? setIsSwipeTop(true) : setIsSwipeTop(false);
      }

      initialX = null;
      initialY = null;
    }
  }

  window.addEventListener("touchstart", initTouch);
  window.addEventListener("touchmove", swipeDirection);
  window.addEventListener("mousedown", (e: MouseEvent) => {
    initTouch(e);
    window.addEventListener("mousemove", swipeDirection);
  });
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", swipeDirection);
  });

  return (
    <MonthContainer>
      <Header>
        <BackArrow onClick={handelClickBackBtn} />
        <div>{getMonth(monthStart) + 1}월</div>
        <PrevArrow onClick={handelClickPrevBtn} />
      </Header>
      {daysOfMonth.map((month, i) => (
        <WeekContainer key={i}>
          {month.map((day, j) =>
            day.isCurrMonth ? (
              <DayContainer
                key={j}
                onClick={() => handelClickDay(day.currentDay)}
                isSwipeTop={isSwipeTop}
              >
                <NumberContainer isToday={day.isToday}>
                  {day.formattedDate}
                </NumberContainer>
                {isSwipeTop ? (
                  <MiniSprout
                    fill={sproutColorList[day.sprout]}
                    style={{ width: "24px", height: "2px" }}
                  />
                ) : (
                  <SproutContainer>{sproutList[day.sprout]}</SproutContainer>
                )}
              </DayContainer>
            ) : (
              <DayContainer key={j} isSwipeTop={isSwipeTop} />
            )
          )}
        </WeekContainer>
      ))}
      {isSwipeTop && (
        <>
          <PickedDay>{format(pickedDay, "PPP", { locale: ko })}</PickedDay>
          <PickedQuestion>
            프로젝트를 하면서 가장 특별했던 순간이 무엇인가요?
          </PickedQuestion>
          <GhostBtn label={"질문 만들기"} />
        </>
      )}
    </MonthContainer>
  );
}

export default Calendar;
