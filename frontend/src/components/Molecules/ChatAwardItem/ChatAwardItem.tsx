import React from "react";
import { Award, Participant } from "../../../constants/types";
import { ResultAwardContainer, ResultAwardUserList } from "./style";
import Contour from "../../Atom/Contour/Contour";
import { QuestionContainer } from "../ChatItem/style";
import { ProfileImg } from "../../Organism/ProfileInfo/style";

function ChatAwardItem(props: { award: Award; bgColor: string }) {
  return (
    <ResultAwardContainer id="question-0">
      <Contour text={"업적"} />
      <QuestionContainer width={"240px"} bgColor={props.bgColor}>
        이야기 보따리 📚
      </QuestionContainer>
      <ResultAwardUserList>
        {props.award.taleteller.map((user: Participant) => (
          <ProfileImg key={user.userId} size={40} bgImg={user.profileImage} />
        ))}
      </ResultAwardUserList>
      <QuestionContainer width={"240px"} bgColor={props.bgColor}>
        포토 그래퍼 📷
      </QuestionContainer>
      <ResultAwardUserList>
        {props.award.photographer.map((user: Participant) => (
          <ProfileImg key={user.userId} size={40} bgImg={user.profileImage} />
        ))}
      </ResultAwardUserList>
      <QuestionContainer width={"240px"} bgColor={props.bgColor}>
        프로 개근러 👍
      </QuestionContainer>
      <ResultAwardUserList>
        {props.award.perfectAttendance.map((user: Participant) => (
          <ProfileImg key={user.userId} size={40} bgImg={user.profileImage} />
        ))}
      </ResultAwardUserList>
    </ResultAwardContainer>
  );
}

export default ChatAwardItem;
