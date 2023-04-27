import React from "react";
import { useLocation } from "react-router-dom";
import {
  NameContainer,
  QuestionDiv,
  ImgContainer,
  IconContainer,
} from "./style";
import TextArea from "../../elements/TextArea/TextArea";
import GhostBtn from "../../elements/Button/GhostBtn";
import { ReactComponent as ImgBtn } from "../../assets/AddImgBtn.svg";
import { ReactComponent as ImgIcon } from "../../assets/ImgIcon.svg";

// 추가로 구현해야할 부분
// 1. 데이터 저장, 수정 api 연결
// 2. 이미지 업로드
// 3. 이미지 미리보기

export default function AnswerPage() {
  const location = useLocation();
  const state = location.state as {
    title: string;
    day: number;
    question: string;
  };
  const title = state.title;
  const day = state.day;
  const question = state.question;
  return (
    <>
      <NameContainer>
        {title} D-{day}
      </NameContainer>
      <QuestionDiv>{question}</QuestionDiv>
      <ImgContainer style={{ backgroundImage: "url()" }}>
        <IconContainer>
          <ImgBtn></ImgBtn>
        </IconContainer>
      </ImgContainer>
      <TextArea></TextArea>
      <GhostBtn label="저장하기"></GhostBtn>
    </>
  );
}
