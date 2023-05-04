import { useState, useEffect } from "react";
import { Award, Chat, GroupResult, Participant } from "../constants/types";
import {
  getGroupIsDoneResultAward,
  getGroupIsDoneResultChat,
  getGroupIsDoneResultParticipantList,
  getGroupIsDoneResultQuestionList,
} from "../apis/result";
import { useNavigate } from "react-router-dom";

interface Props {
  award: Award;
  resData: Participant[];
  questionList: Chat[];
  participantList: Participant[];
  groupResult: GroupResult;
}

function useGroupIsDoneResultAward(parsedMeetingId: number): Props {
  const [groupResult, setGroupResult] = useState<Props>({
    award: {
      taleteller: [],
      photographer: [],
      perfectAttendance: [],
    },
    participantList: [],
    questionList: [],
    resData: [],
    groupResult: {
      meetingId: 0,
      title: "모임명",
      startDay: "2023-01-01",
      endDay: "2023-01-01",
      color: "var(--bg-color)",
      participantCnt: 0,
      tag: [],
      chat: [],
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(parsedMeetingId)) {
      navigate("/404");
    } else {
      getGroupIsDoneResultQuestionList(parsedMeetingId)
        .then((res) => {
          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            questionList: res.data,
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultParticipantList(parsedMeetingId)
        .then((res) => {
          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            participantList: res.data,
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultChat(parsedMeetingId)
        .then((res) => {
          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            groupResult: res.data,
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultAward(parsedMeetingId)
        .then((res) => {
          console.log(res);

          const award: Award = {
            taleteller: [],
            photographer: [],
            perfectAttendance: [],
          };

          res.data.map((profile: Participant) => {
            if (profile.type === "PHOTOGRAPHER")
              award.photographer.push(profile);
            else if (profile.type === "PERFECTATTENDANCE")
              award.perfectAttendance.push(profile);
            else award.taleteller.push(profile);
            return 0;
          });

          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            award: award,
            resData: res.data,
          }));
        })
        .catch((error) => {
          console.error(error);
          navigate("/error");
        });
    }
  }, [navigate, parsedMeetingId]);

  return {
    award: groupResult.award,
    resData: groupResult.resData,
    groupResult: groupResult.groupResult,
    participantList: groupResult.participantList,
    questionList: groupResult.questionList,
  };
}
export default useGroupIsDoneResultAward;
