import React, { useState } from "react";
import { GroupQuestionHeader, GroupQuestionInput } from "./style";
import Emoji from "../../Atom/Emoji/Emoji";
import { createQuestion } from "../../../apis/home";
import { toast } from "react-hot-toast";
import Btn from "../../Atom/Btn/Btn";
interface Props {
  meetingId: number;
}
function GroupQuestion({ meetingId }: Props) {
  const [question, setQuestion] = useState("");
  const [isLoding, setIsLoding] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleClickCreateBtn = () => {
    setIsLoding(false);
    if (question.length === 0) {
      toast.error("질문을 입력하세요.");
      setIsLoding(false);
      return;
    } else if (question.length > 38) {
      toast.error("질문은 최대 38자입니다.");
      setIsLoding(false);
      return;
    }

    toast
      .promise(createQuestion(meetingId, question), {
        loading: "질문을 저장중입니다...",
        success: <b>저장을 완료했습니다.</b>,
        error: <b>에 실패했습니다.</b>,
      })
      .then(() => {
        setIsLoding(true);
        setQuestion("");
      })
      .catch(() => {
        setIsLoding(false);
      });
  };
  return (
    <>
      <GroupQuestionHeader>
        <div
          style={{ fontWeight: "bold", fontSize: "18px", lineHeight: "24px" }}
        >
          <div>모임 멤버들에게</div>
          <div>궁금한 질문들을 추가해보세요!</div>
        </div>
        <div style={{ fontSize: "16px", lineHeight: "20px" }}>
          <div>- 질문은 익명으로 등록됩니다.</div>
          <div>- 질문은 매일 아침 8시 랜덤으로 결정됩니다.</div>
          <div>- 추가한 질문들이 채택되지 않을 수 있습니다.</div>
        </div>
      </GroupQuestionHeader>
      <Emoji label="🤗" />
      <GroupQuestionInput onChange={onChange} value={question} />
      {isLoding && <Btn label="등록 하기" onClick={handleClickCreateBtn} />}
    </>
  );
}

export default GroupQuestion;
