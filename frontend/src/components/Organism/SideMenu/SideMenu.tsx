import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProfileItem, SideMenuContainer, SideMenuHeader } from "./style";
import { ReactComponent as CloseArrow } from "../../../assets/Close_Arrow.svg";
import AccordionList from "../AccordionList/AccordionList";
import { AccordionItemType, Chat, Participant } from "../../../constants/types";
import { QuestionItem } from "../../Molecules/ChatItem/style";
import { ProfileImg } from "../ProfileInfo/style";

function SideMenu(props: {
  questionList: Chat[];
  participantList: Participant[];
  bgColor: string;
  sideMenuOpen: boolean;
  handleSideMenuOpen: (sideMenuOpen: boolean) => void;
}) {
  const [menuItemList, setMenuItemList] = useState<AccordionItemType[]>([
    {
      title: "질문 목록",
      content: <div></div>,
    },
    {
      title: "모임 구성원",
      content: <div></div>,
    },
  ]);

  const handleClickCloseBtn = () => {
    props.handleSideMenuOpen(false);
  };

  const Scroll = require("react-scroll");
  const scroller = Scroll.scroller;

  useEffect(() => {
    const handleClickQuestion = (questionId: number) => {
      props.handleSideMenuOpen(false);

      scroller.scrollTo(`question-${questionId}`, {
        duration: 500,
        smooth: true,
        containerId: "Result-Container",
      });
    };

    const questionList = props.questionList.map((item) => (
      <QuestionItem
        key={item.questionId}
        bgColor={props.bgColor}
        onClick={() => handleClickQuestion(item.questionId)}
      >
        <div style={{ fontSize: "10px", color: "var(--darkgray-color)" }}>
          {item.day}
        </div>
        {item.question}
      </QuestionItem>
    ));

    const participantList = props.participantList.map((item) => (
      <ProfileItem key={item.userId}>
        <ProfileImg size={40} bgImg={item.profileImage} />
        {item.nickname}
      </ProfileItem>
    ));

    const menuItemData = [
      {
        title: "질문 목록",
        content: (
          <>
            {questionList}
            <QuestionItem
              bgColor={props.bgColor}
              onClick={() => handleClickQuestion(0)}
            >
              업적
            </QuestionItem>
          </>
        ),
      },
      {
        title: "모임 구성원",
        content: <>{participantList}</>,
      },
    ];

    setMenuItemList(menuItemData);
  }, [props, scroller]);

  return (
    <SideMenuContainer>
      <motion.div
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        animate={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      ></motion.div>
      <motion.div
        initial={{ right: "-100%" }}
        animate={{ right: "0%" }}
        exit={{ right: "-100%" }}
      >
        <SideMenuHeader>
          <CloseArrow onClick={handleClickCloseBtn} />
        </SideMenuHeader>
        <AccordionList items={menuItemList} />
      </motion.div>
    </SideMenuContainer>
  );
}

export default SideMenu;
