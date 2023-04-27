import React, { useMemo, useState } from "react";
import Calendar from "../Calendar/Calendar";
import QuestionOfDay from "../QuestionOfDay/QuestionOfDay";
import { GroupCalendarContainer } from "./style";
import { GroupInfo, Question } from "../../constants/types";

function UpdateQuestionMap(questionList: Question[]) {
  let map = new Map();
  questionList?.map((question) => {
    map.set(question.day, question.question);
    return 0;
  });
  return map;
}

interface Props {
  groupInfo: GroupInfo;
  questionList: Question[];
}

function GroupCalendar({ groupInfo, questionList }: Props) {
  const [isSwipeTop, setIsSwipeTop] = useState(false);
  const [pickedDay, setPickedDay] = useState(new Date());

  const questionMap = useMemo(
    () => UpdateQuestionMap(questionList),
    [questionList]
  );

  return (
    <GroupCalendarContainer>
      <Calendar
        isSwipeTop={isSwipeTop}
        setIsSwipeTop={setIsSwipeTop}
        pickedDay={pickedDay}
        setPickedDay={setPickedDay}
        groupInfo={groupInfo}
        questionMap={questionMap}
      />
      {isSwipeTop && (
        <QuestionOfDay
          pickedDay={pickedDay}
          questionMap={questionMap}
          groupInfo={groupInfo}
        />
      )}
    </GroupCalendarContainer>
  );
}

export default GroupCalendar;
