import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionList, getGroupList } from "../../apis/home";
import { GroupInfo, Question } from "../../constants/types";
import { toast } from "react-hot-toast";

function useHomePage() {
  const navigate = useNavigate();
  const [homeContent, setHomeContent] = useState(0); // 0:달력, 1:질문, 2:참여지
  const [groupList, setGroupList] = useState<GroupInfo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionList, setQuestionList] = useState<Question[]>();

  useEffect(() => {
    getGroupList()
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    groupList?.length > 0 &&
      getQuestionList(groupList[currentIndex].meetingId)
        .then((res) => {
          setQuestionList(res.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
  }, [currentIndex, groupList]);

  return {
    navigate,
    homeContent,
    setHomeContent,
    groupList,
    currentIndex,
    setCurrentIndex,
    questionList,
  };
}

export default useHomePage;
