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
    participant: [],
    participantCnt: 0,
    tag: [],
    award: {
      taleteller: [],
      photographer: [],
      perfectAttendance: [],
    },
    chat: [],
  });
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const parsedMeetingId = Number(meetingId);

    if (isNaN(parsedMeetingId)) {
      navigate("/404");
    } else {
      getGroupIsDoneResultChat(parsedMeetingId)
        .then((res) => {
          console.log(res);

          setGroupResult((prevGroupResult) => ({
            meetingId: res.data.meetingId,
            title: res.data.title,
            startDay: res.data.startDay,
            endDay: res.data.endDay,
            color: res.data.color,
            participant: res.data.participant,
            participantCnt: res.data.participantCnt,
            tag: res.data.tag,
            chat: res.data.chat,
            award: prevGroupResult.award,
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultAward(parsedMeetingId)
        .then((res) => {
          console.log(res);

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

          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            award: award,
          }));
        })
        .catch((error) => {
          console.error(error);
        });

      getGroupIsDoneResultParticipantList(parsedMeetingId)
        .then((res) => {
          console.log(res);

          setGroupResult((prevGroupResult) => ({
            ...prevGroupResult,
            participant: res.data,
          }));
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
            groupResult={groupResult}
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
        <ChatAwardItem award={groupResult.award} bgColor={groupResult.color} />
        <div></div>
      </ResultContainer>
    </>
  );
}

export default ResultPage;
