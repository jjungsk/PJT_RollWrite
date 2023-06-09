import React, { useState } from "react";
import { NameContainer, QuestionDiv } from "./style";
import {
  createAnswer,
  deleteAnswerImg,
  updateAnswer,
} from "../../apis/question";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "../../constants/types";
import toast from "react-hot-toast";
import { showToastModal } from "../../utils/ToastModal";
import UploadImg from "../../components/Molecules/UploadImg/UploadImg";
import TextArea from "../../components/Atom/TextArea/TextArea";
import Btn from "../../components/Atom/Btn/Btn";

export default function AnswerPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [ImgFile, setImgFile] = useState<File>();
  const [question, setQuestion] = useState<Question>(location.state.question);

  const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({
      ...question,
      answer: e.target.value,
    });
  };

  const formData = new FormData();

  const handleSaveBtn = () => {
    if (question.answer === null || question.answer.length <= 0) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    if (question.answer.length > 300) {
      toast.error(" 답변은 300자이내입니다.");
      return;
    }

    const data = JSON.stringify({
      answer: question.answer,
      meetingId: question.meetingId,
      questionId: question.questionId,
    });
    const jsonData = new Blob([data], { type: "application/json" });

    formData.append(
      location.state.isModify ? "modifyAnswerReqDto" : "addAnswerReqDto",
      jsonData
    );

    if (ImgFile) {
      formData.append("image", ImgFile);
    }

    location.state.isModify
      ? modifyAnswer()
      : question.isFinal
      ? showToastModal(
          saveAnswer,
          "마지막 질문은 수정이 불가능합니다.",
          "저장하시겠습니까?"
        )
      : saveAnswer();
  };

  const modifyAnswer = () => {
    toast
      .promise(updateAnswer(formData), {
        loading: "답변을 수정중입니다...",
        success: <b>답변이 수정됐습니다!</b>,
        error: <b>수정을 실패했습니다!</b>,
      })
      .then(() => {
        navigate(-1);
      });
  };

  const saveAnswer = () => {
    toast
      .promise(createAnswer(formData), {
        loading: "답변을 저장중입니다...",
        success: <b>답변이 저장됐습니다!</b>,
        error: <b>저장을 실패했습니다!</b>,
      })
      .then(() => {
        question.isFinal
          ? navigate(`/award/${question.meetingId}`)
          : navigate(-1);
      });
  };

  const handelClickDeleteBtn = () => {
    deleteAnswerImg(question.questionId)
      .then(() => {
        toast("이미지가 삭제되었습니다.", {
          icon: "🗑",
        });
        window.location.reload();
      })
      .catch(() => {
        toast.error("이미지 삭제 중 문제가 발생하였습니다");
      });
  };

  return (
    <>
      <NameContainer>
        {question.title}
        {question.day > 0 ? ` D-${question.day}` : " D-day"}
      </NameContainer>
      <QuestionDiv>{question.question}</QuestionDiv>
      <UploadImg
        setImgFile={setImgFile}
        img={question.image}
        handelClickDeleteBtn={handelClickDeleteBtn}
      />

      <TextArea
        onChange={handleAnswer}
        value={question.answer || ""}
      ></TextArea>

      <Btn
        label={location.state.isModify ? "수정하기" : "저장하기"}
        onClick={handleSaveBtn}
      ></Btn>
    </>
  );
}
