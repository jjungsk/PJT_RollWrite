import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionList, getGroupList } from "../../apis/home";
import { GroupInfo, Question } from "../../constants/types";

function useHomePage() {
  const navigate = useNavigate();
  const [homeContent, setHomeContent] = useState(0); // 0:달력, 1:질문, 2:참여지
  const [groupList, setGroupList] = useState<GroupInfo[]>();
  const [nowIndex, setNowIndex] = useState(0);
  const [questionList, setQuestionList] = useState<Question[]>();

  useEffect(() => {
    getGroupList()
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    groupList &&
      getQuestionList(groupList[nowIndex].meetingId)
        .then((res) => {
          setQuestionList(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [nowIndex, groupList]);

  return {
    navigate,
    homeContent,
    setHomeContent,
    groupList,
    nowIndex,
    setNowIndex,
    questionList,
  };
}

export default useHomePage;
