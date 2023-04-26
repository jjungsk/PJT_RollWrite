import React from "react";
import { useNavigate } from "react-router-dom";
import {
  InfoContainer,
  DateDiv,
  NameDiv,
  EmojiContainer,
  TextDiv,
  BtnContainer,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import Emoji from "../../elements/Emoji/Emoji";

function QuestionPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* 모임 없는 경우 */}
      <InfoContainer>
        <DateDiv>2023.04.18</DateDiv>
      </InfoContainer>
      <EmojiContainer>
        <Emoji label="🤔"></Emoji>
      </EmojiContainer>
      <TextDiv>
        음.. 모임이 없습니다 <br /> 모임을 만들든가 들어가든가 하세요
      </TextDiv>
      <BtnContainer>
        <GhostBtn
          label="모임 만들기"
          onClick={() => navigate("/create")}
        ></GhostBtn>
      </BtnContainer>

      {/* 모임 있는 경우 */}
      {/* <InfoContainer>
        <DateDiv>2023.04.18</DateDiv>
        <NameDiv>싸피모임 D-10</NameDiv>
      </InfoContainer>
      <EmojiContainer>
        <Emoji label="🍖"></Emoji>
      </EmojiContainer>
      <TextDiv>어제 저녁에 무엇을 먹었나요?</TextDiv>
      <BtnContainer>
        <GhostBtn label="입력하기"></GhostBtn>
      </BtnContainer> */}
    </>
  );
}

export default QuestionPage;
