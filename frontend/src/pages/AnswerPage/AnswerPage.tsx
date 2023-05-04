import React, { useState } from "react";
import {
  NameContainer,
  QuestionDiv,
  ImgContainer,
  IconContainer,
  TextContainer,
  ContentContainer,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import Btn from "../../assets/AddImgBtn.svg";
import { ReactComponent as Trash } from "../../assets/Trash-alt.svg";
import {
  createAnswer,
  deleteAnswerImg,
  updateAnswer,
} from "../../apis/question";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionInfo } from "../../constants/types";
import toast, { Toaster } from "react-hot-toast";
import { showToastModal } from "../../utils/ToastModal";

export default function AnswerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // 이미지
  const [ImgFile, setImgFile] = useState<File>();
  const [tmpImg, setTmpImg] = useState<string>("");
  // 답변
  const [question, setQuestion] = useState<QuestionInfo>(
    location.state.question
  );
  // 답변 입력하면 answer에 넣어줌
  const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({
      ...question,
      answer: e.target.value,
    });
  };

  // 이미지 업로드 및 미리보기
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setTmpImg(e.target.result as string);
          setImgFile(files[0]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const formData = new FormData();
  // 버튼 눌렀을 때 api로 데이터 전송
  const handleSaveBtn = () => {
    // formData에 이미지, 답변 저장

    const data = JSON.stringify({
      answer: question.answer,
      meetingId: question.meetingId,
      questionId: question.questionId,
    });
    const jsonData = new Blob([data], { type: "application/json" });
    location.state.isModify
      ? formData.append("modifyAnswerReqDto", jsonData)
      : formData.append("addAnswerReqDto", jsonData);

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
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  };
  const saveAnswer = () => {
    toast
      .promise(createAnswer(formData), {
        loading: "답변을 저장중입니다...",
        success: <b>답변이 저장됐습니다!</b>,
        error: <b>저장을 실패했습니다!</b>,
      })
      .then((res) => {
        console.log(res);
        question.isFinal
          ? navigate(`/award/${question.meetingId}`)
          : navigate(-1);
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  };

  const handelClickDeleteBtn = () => {
    setQuestion({
      ...question,
      image: "/img.png",
    });
    deleteAnswerImg(question.questionId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Toaster />
      <NameContainer>
        {question.title} D-{question.day}
      </NameContainer>
      <QuestionDiv>{question.question}</QuestionDiv>
      <ImgContainer BgImg={tmpImg ? tmpImg : question.image}>
        <IconContainer>
          <label htmlFor="profile-img">
            <img src={Btn} alt="img" />
          </label>
        </IconContainer>
        <input
          id="profile-img"
          type="file"
          accept="image/*"
          onChange={handleImg}
          style={{ display: "none" }}
        />
        {question.image && (
          <Trash
            style={{ position: "absolute", bottom: "8px", right: "8px" }}
            onClick={handelClickDeleteBtn}
          />
        )}
      </ImgContainer>
      <TextContainer>
        <ContentContainer
          onChange={handleAnswer}
          value={question.answer}
        ></ContentContainer>
      </TextContainer>
      <GhostBtn
        label={location.state.isModify ? "수정하기" : "저장하기"}
        onClick={handleSaveBtn}
      ></GhostBtn>
    </>
  );
}
