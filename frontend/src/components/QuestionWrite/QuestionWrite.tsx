import React, { useState } from "react";
import Emoji from "../../elements/Emoji/Emoji";
import GhostBtn from "../../elements/Button/GhostBtn";
import { Title, SubTitle, QuestionInput } from "./style";
import FillBtn from "../../elements/Button/FillBtn";
import { createQuestion } from "../../apis/home";
import { toast } from "react-hot-toast";

function QuestionWrite(props: {
  setHomeContent: (homeContent: number) => void;
  groupId: number;
}) {
  const [question, setQuestion] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleClickCreateBtn = () => {
    props.setHomeContent(0);
    toast
      .promise(createQuestion(props.groupId, question), {
        loading: "질문을 저장중입니다...",
        success: (
          <b>
            저장을 완료했습니다.
            <br />
            보내주신 질문은 채택되지 않을 수도 있습니다.
          </b>
        ),
        error: <b>에 실패했습니다.</b>,
      })
      .then(() => {})
      .catch(() => {});
  };
  return (
    <div style={{ paddingInline: "12px" }}>
      <Title>원하는 질문을 입력해 주세요.</Title>
      <SubTitle>무엇이 궁금 하나요?</SubTitle>
      <Emoji label="🧐" />
      <QuestionInput onChange={onChange} value={question} />
      {question.length > 0 ? (
        <FillBtn label="질문 추가" onClick={handleClickCreateBtn} />
      ) : (
        <GhostBtn label="취소 하기" onClick={() => props.setHomeContent(0)} />
      )}
    </div>
  );
}

export default QuestionWrite;
