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
  isAfter,
  isBefore,
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
  QuestionContainer,
} from "./style";
import { ko } from "date-fns/locale";
import GhostBtn from "../../elements/Button/GhostBtn";
import { DayInfo, Question } from "../../constants/types";

const DATE_WEEK_LENGTH = 7;
const TODAY = new Date();
const sproutList = [
  <></>,
  <Sprout1 />,
  <Sprout2 />,
  <Sprout3 />,
  <Sprout4 />,
  <Sprout5 />,
];
const sproutColorList = [
  "#F0EDE6",
  "#FF9847",
  "#3F942C",
  "#916F66",
  "#CF6F49",
  "#FFDC00",
];

function generateOneWeek(
  dateStart: Date,
  monthStart: Date,
  questionList?: Question[],
  startDay?: string,
  endDay?: string
) {
  let map = new Map();
  questionList?.map((question) => {
    map.set(question.day, question.question);
    return 0;
  });

  const daysOfWeek = [];
  let currentDay = dateStart;

  for (let i = 0; i < DATE_WEEK_LENGTH; i++) {
    const isPeriod =
      isAfter(currentDay, new Date(startDay!)) &&
      isBefore(currentDay, new Date(endDay!));
    const isToday = isSameDay(currentDay, TODAY);
    daysOfWeek.push({
      currentDay,
      formattedDate: format(currentDay, "d"),
      isToday: isToday,
      isCurrMonth: isSameMonth(currentDay, monthStart),
      isPeriod: isPeriod,
      sprout: map.has(format(currentDay, "yyyy-MM-dd", { locale: ko }))
        ? Math.floor(Math.random() * 4) + 1
        : 0,
      question: map.has(format(currentDay, "yyyy-MM-dd", { locale: ko }))
        ? map.get(format(currentDay, "yyyy-MM-dd", { locale: ko }))
        : isToday
        ? "오늘 질문에 답변했나요? 🤓"
        : isPeriod
        ? isAfter(TODAY, currentDay)
          ? "답변을 하지 않아서 질문을 볼수가 없어요~😛"
          : "아직 질문이 공개되지 않았습니다.🤔"
        : "모임 기간이 아닙니다. ❌",
    });

    currentDay = addDays(currentDay, 1);
  }

  return daysOfWeek;
}

function makeCalendar(
  monthStart: Date,
  questionList?: Question[],
  startDay?: string,
  endDay?: string
) {
  const weekLength = getWeeksInMonth(monthStart);
  const daysOfMonth = [];
  for (let i = 0; i < weekLength; i++) {
    const currentDate = addDays(monthStart, i * 7);
    const startDate = startOfWeek(currentDate);
    const oneWeek = generateOneWeek(
      startDate,
      monthStart,
      questionList,
      startDay,
      endDay
    );
    daysOfMonth.push(oneWeek);
  }

  return daysOfMonth;
}

function Calendar(props: {
  setHomeContent: (homeContent: number) => void;
  questionList?: Question[];
  startDay?: string;
  endDay?: string;
}) {
  const [monthStart, setMonthStart] = useState(startOfMonth(TODAY));
  const [pickedDay, setPickedDay] = useState(TODAY);
  const [pickedQuestion, setPickedQuestion] = useState("");
  const [isSwipeTop, setIsSwipeTop] = useState(false);

  const handelClickBackBtn = () => {
    setMonthStart(subMonths(monthStart, 1));
  };
  const handelClickPrevBtn = () => {
    setMonthStart(addMonths(monthStart, 1));
  };
  const handelClickDay = (day: DayInfo) => {
    setPickedDay(day.currentDay);
    setPickedQuestion(day.question);
  };

  const daysOfMonth = useMemo(
    () =>
      makeCalendar(
        monthStart,
        props.questionList,
        props.startDay,
        props.endDay
      ),
    [monthStart, props.endDay, props.questionList, props.startDay]
  );

  // 스와이프 감지
  let initialX: number | null = null;
  let initialY: number | null = null;

  function initTouch(e: MouseEvent | React.TouchEvent<HTMLDivElement>) {
    const touchEvent = e as React.TouchEvent;
    initialX = touchEvent.touches
      ? touchEvent.touches[0].clientX
      : (e as MouseEvent).clientX;
    initialY = touchEvent.touches
      ? touchEvent.touches[0].clientY
      : (e as MouseEvent).clientY;
  }

  function swipeDirection(e: MouseEvent | React.TouchEvent<HTMLDivElement>) {
    if (initialX !== null && initialY !== null) {
      const touchEvent = e as React.TouchEvent;
      const currentX = touchEvent.touches
        ? touchEvent.touches[0].clientX
        : (e as MouseEvent).clientX;
      const currentY = touchEvent.touches
        ? touchEvent.touches[0].clientY
        : (e as MouseEvent).clientY;

      let diffX = initialX - currentX;
      let diffY = initialY - currentY;

      if (Math.abs(diffX) < Math.abs(diffY))
        diffY > 0 ? setIsSwipeTop(true) : setIsSwipeTop(false);

      initialX = null;
      initialY = null;
    }
  }

  return (
    <>
      <MonthContainer onTouchStart={initTouch} onTouchMove={swipeDirection}>
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
                  onClick={() => handelClickDay(day)}
                  isSwipeTop={isSwipeTop}
                  isPicked={day.currentDay === pickedDay}
                  isPeriod={day.isPeriod}
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
                <DayContainer
                  key={j}
                  isSwipeTop={isSwipeTop}
                  isPicked={day.currentDay === pickedDay}
                />
              )
            )}
          </WeekContainer>
        ))}
      </MonthContainer>
      {isSwipeTop && (
        <QuestionContainer>
          <PickedDay>{format(pickedDay, "PPP", { locale: ko })}</PickedDay>
          <PickedQuestion>{pickedQuestion}</PickedQuestion>
          <GhostBtn
            label={"질문 만들기"}
            onClick={() => props.setHomeContent(1)}
          />
        </QuestionContainer>
      )}
    </>
  );
}

export default Calendar;
