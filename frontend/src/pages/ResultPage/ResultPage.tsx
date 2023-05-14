import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as HamburgerMenu } from "../../assets/Hamburger_Menu.svg";
import { ReactComponent as Person } from "../../assets/Person.svg";
import { ResultContainer } from "./style";
import {
  HeaderContainer,
  HeaderGroupTitle,
} from "../../components/Organism/Header/style";
import format from "date-fns/format";
import SideMenu from "../../components/Organism/SideMenu/SideMenu";
import ChatItem from "../../components/Molecules/ChatItem/ChatItem";
import ChatAwardItem from "../../components/Molecules/ChatAwardItem/ChatAwardItem";
import useGroupIsDoneResultAward from "../../hooks/useGroupIsDoneResultAward";

function ResultPage() {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const { award, participantList, questionList, groupResult } =
    useGroupIsDoneResultAward(Number(meetingId));

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
        {groupResult.chat.map((chat) => (
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
