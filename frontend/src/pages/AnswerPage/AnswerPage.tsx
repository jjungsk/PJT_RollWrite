import React from "react";
import {
  NameContainer,
  QuestionDiv,
  ImgContainer,
  BtnContainer,
} from "./style";
import TextArea from "../../elements/TextArea/TextArea";
import GhostBtn from "../../elements/Button/GhostBtn";
import { ReactComponent as ImgBtn } from "../../assets/AddImgBtn.svg";
import { ReactComponent as ImgIcon } from "../../assets/ImgIcon.svg";

export default function AnswerPage() {
  return (
    <>
      <NameContainer>싸피 모임 D-10</NameContainer>
      <QuestionDiv>
        프로젝트를 하면서 가장 특별했던 순간이 무엇인가요를레이요를레이?
      </QuestionDiv>
      <ImgContainer>
        <ImgIcon width="80px"></ImgIcon>
        <BtnContainer>
          <ImgBtn></ImgBtn>
        </BtnContainer>
      </ImgContainer>
      <TextArea></TextArea>
      <GhostBtn label="저장하기"></GhostBtn>
    </>
  );
}
