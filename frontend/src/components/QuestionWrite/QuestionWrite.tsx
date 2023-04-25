import React, { useState } from "react";
import Emoji from "../../elements/Emoji/Emoji";
import GhostBtn from "../../elements/Button/GhostBtn";
import { Title, SubTitle, QuestionInput, QuestionCount } from "./style";
import FillBtn from "../../elements/Button/FillBtn";

function QuestionWrite(props: {
  setHomeContent: (homeContent: number) => void;
}) {
  const [question, setQuestion] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  return (
    <div>
      <Title>원하는 질문을 입력해주세요.</Title>
      <SubTitle>무잇이 궁금 하나요?</SubTitle>
      <Emoji label="🧐" />
      <QuestionCount>
        <span>1</span>/<span>4</span>
      </QuestionCount>
      <QuestionInput onChange={onChange} value={question} />
      {question.length > 0 ? (
        <FillBtn label="질문 추가" onClick={() => props.setHomeContent(0)} />
      ) : (
        <GhostBtn label="취소 하기" onClick={() => props.setHomeContent(0)} />
      )}
    </div>
  );
}

export default QuestionWrite;
