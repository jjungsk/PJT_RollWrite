import React from "react";
import Calendar from "../../components/Calendar/Calendar";
import QuestionWrite from "../../components/QuestionWrite/QuestionWrite";
import { Question, GroupInfo } from "../../constants/types";

interface HomeContentProps {
  homeContent: number;
  setHomeContent: (value: number) => void;
  questionList: Question[];
  group: GroupInfo;
}

function HomeContent({
  homeContent,
  setHomeContent,
  questionList,
  group,
}: HomeContentProps) {
  return (
    <>
      {homeContent === 0 && (
        <Calendar
          setHomeContent={setHomeContent}
          questionList={questionList}
          startDay={group.startDay}
          endDay={group.endDay}
          color={group.color}
        />
      )}
      {homeContent === 1 && (
        <QuestionWrite
          setHomeContent={setHomeContent}
          groupId={group.meetingId}
        />
      )}
    </>
  );
}

export default HomeContent;
