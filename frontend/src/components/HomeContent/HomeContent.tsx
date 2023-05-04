import React from "react";
import QuestionWrite from "../../components/QuestionWrite/QuestionWrite";
import { Question, GroupInfo } from "../../constants/types";
import GroupCalendar from "../GroupCalendar/GroupCalendar";
import ParticipantList from "../ParticipantList/ParticipantList";

interface HomeContentProps {
  homeContent: number;
  setHomeContent: React.Dispatch<React.SetStateAction<number>>;
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
        <GroupCalendar
          groupInfo={groupInfo}
          questionList={questionList}
          setHomeContent={setHomeContent}
        />
      )}
      {homeContent === 1 && (
        <QuestionWrite
          setHomeContent={setHomeContent}
          groupId={groupInfo.meetingId}
        />
      )}
      {homeContent === 2 && <ParticipantList groupInfo={groupInfo} />}
    </>
  );
}

export default HomeContent;
