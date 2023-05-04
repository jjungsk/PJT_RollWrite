import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Award, Chat, GroupResult, Participant } from "../../constants/types";
import {
  HeaderContainer,
  HeaderGroupTitle,
} from "../../components/Header/style";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as HamburgerMenu } from "../../assets/Hamburger_Menu.svg";
import { ReactComponent as Person } from "../../assets/Person.svg";
import { ResultContainer } from "./style";
import format from "date-fns/format";
import SideMenu from "../../components/SideMenu/SideMenu";
import ChatItem from "../../components/ChatItem/ChatItem";
import ChatAwardItem from "../../components/ChatAwardItem/ChatAwardItem";
import {
  getGroupIsDoneResultAward,
  getGroupIsDoneResultChat,
  getGroupIsDoneResultParticipantList,
  getGroupIsDoneResultQuestionList,
} from "../../apis/result";

function ResultPage() {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [groupResult, setGroupResult] = useState<GroupResult>({
    meetingId: 0,
    title: "모임명",
    startDay: "2023-01-01",
    endDay: "2023-01-01",
    color: "var(--bg-color)",
    participantCnt: 0,
    tag: [],
    chat: [],
  });
  const [award, setAward] = useState<Award>({
    taleteller: [],
    photographer: [],
    perfectAttendance: [],
  });
  const [participantList, setParticipantList] = useState<Participant[]>([]);
  const [questionList, setQuestionList] = useState<Chat[]>([]);
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const parsedMeetingId = Number(meetingId);

    if (isNaN(parsedMeetingId)) {
      navigate("/404");
    } else {
      getGroupIsDoneResultQuestionList(parsedMeetingId)
        .then((res) => {
          setQuestionList(res.data);
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultParticipantList(parsedMeetingId)
        .then((res) => {
          setParticipantList(res.data);
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultChat(parsedMeetingId)
        .then((res) => {
          setGroupResult(res.data);
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultAward(parsedMeetingId)
        .then((res) => {
          var award: Award = {
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

          setAward(award);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate, meetingId]);

  const handleClickBackBtn = () => {
    navigate("/my");
  };

  const handleClickMenuBtn = () => {
    setSideMenuOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {sideMenuOpen && (
          <SideMenu
            questionList={questionList}
            participantList={participantList}
            bgColor={groupResult.color}
            sideMenuOpen={sideMenuOpen}
            handleSideMenuOpen={setSideMenuOpen}
          />
        )}
      </AnimatePresence>
      <HeaderContainer padding={"0px 24px 0px 24px"}>
        <Back onClick={handleClickBackBtn} />
        <HeaderGroupTitle>
          <div>
            <div>{groupResult.title}</div>
            <Person />
            <div>{groupResult.participantCnt}</div>
          </div>
          <div>
            {format(new Date(groupResult.startDay), "yyyy.MM.dd")}
            {" ~ "}
            {format(new Date(groupResult.endDay), "yyyy.MM.dd")}
          </div>
        </HeaderGroupTitle>
        <HamburgerMenu onClick={handleClickMenuBtn} />
      </HeaderContainer>

      <ResultContainer id="Result-Container">
        {groupResult.chat.map((chat: Chat) => (
          <ChatItem
            key={chat.questionId}
            chat={chat}
            bgColor={groupResult.color}
          />
        ))}
        <ChatAwardItem award={award} bgColor={groupResult.color} />
        <div></div>
      </ResultContainer>
    </>
  );
}

export default ResultPage;
