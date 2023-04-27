import React, { useMemo, useState } from "react";
import { ReactComponent as Sprout1 } from "../../assets/Sprout_1.svg";
import { ReactComponent as Sprout2 } from "../../assets/Sprout_2.svg";
import { ReactComponent as Sprout3 } from "../../assets/Sprout_3.svg";
import { ReactComponent as Sprout4 } from "../../assets/Sprout_4.svg";
import { ReactComponent as Sprout5 } from "../../assets/Sprout_5.svg";
import { ReactComponent as MiniSprout } from "../../assets/MiniSprout.svg";
import { ReactComponent as BackArrow } from "../../assets/Back_Arrow.svg";
import { ReactComponent as PrevArrow } from "../../assets/Prev_Arrow.svg";

import { format, getMonth, startOfMonth, addMonths, subMonths } from "date-fns";
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
import { initTouch, swipeDirection } from "../../apis/swipeDetector";
import { TODAY, makeCalendar } from "../../apis/makeCalendar";

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

function Calendar(props: {
  setHomeContent: (homeContent: number) => void;
  questionList: Question[];
  startDay: string;
  endDay: string;
  color: string;
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

  return (
    <>
      <MonthContainer
        onTouchStart={initTouch}
        onTouchMove={(e) =>
          swipeDirection(
            e,
            () => setIsSwipeTop(true),
            () => setIsSwipeTop(false)
          )
        }
        onMouseDown={initTouch}
        onMouseMove={(e) =>
          swipeDirection(
            e,
            () => setIsSwipeTop(true),
            () => setIsSwipeTop(false)
          )
        }
      >
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
                  color={props.color}
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
