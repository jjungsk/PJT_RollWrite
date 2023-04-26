import React from "react";
import { NameContainer, QuestionDiv } from "./style";
import TextArea from "../../elements/TextArea/TextArea";

export default function AnswerPage() {
  return (
    <>
      <NameContainer>싸피 모임 D-10</NameContainer>
      <QuestionDiv>
        프로젝트를 하면서 가장 특별했던 순간이 무엇인가요를레이요를레이?
      </QuestionDiv>
      <TextArea></TextArea>
    </>
  );
}
