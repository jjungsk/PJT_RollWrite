import { useState, useEffect } from "react";
import { Award, Participant } from "../constants/types";
import {
  getGroupIsDoneResultAward,
  getGroupIsDoneResultChat,
} from "../apis/result";
import { useNavigate } from "react-router-dom";

interface GroupResult {
  award: Award;
  resData: Participant[];
  title: string;
}

function useGroupIsDoneResultAward(parsedMeetingId: number): GroupResult {
  const [groupResult, setGroupResult] = useState<GroupResult>({
    award: {
      taleteller: [],
      photographer: [],
      perfectAttendance: [],
    },
    title: "",
    resData: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(parsedMeetingId)) {
      navigate("/404");
    } else {
      getGroupIsDoneResultChat(parsedMeetingId)
        .then((res) => {
          console.log(res);
          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            title: res.data.title,
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
    title: groupResult.title,
  };
}
export default useGroupIsDoneResultAward;
