import React from "react";
import QuestionWrite from "../../components/QuestionWrite/QuestionWrite";
import { Question, GroupInfo } from "../../constants/types";
import GroupCalendar from "../GroupCalendar/GroupCalendar";

interface HomeContentProps {
  homeContent: number;
  setHomeContent: (value: number) => void;
  questionList: Question[];
  groupInfo: GroupInfo;
}

function HomeContent({
  homeContent,
  setHomeContent,
  questionList,
  groupInfo,
}: HomeContentProps) {
  return (
    <>
      {homeContent === 0 && (
        <GroupCalendar groupInfo={groupInfo} questionList={questionList} />
      )}
      {homeContent === 1 && (
        <QuestionWrite
          setHomeContent={setHomeContent}
          groupId={groupInfo.meetingId}
        />
      )}
    </>
  );
}

export default HomeContent;
