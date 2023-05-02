import React, { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
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
import { createAnswer, updateAnswer } from "../../apis/question";

export default function AnswerPage() {
  // const location = useLocation();
  // const state = location.state as {
  //   title: string;
  //   day: number;
  //   question: string;
  //   questionId: number;
  //   meetingId: number;
  // };
  // const title = state.title;
  // const day = state.day;
  // const question = state.question;
  // const questionId = state.questionId;
  // const meetingId = state.meetingId;

  // 테스트용 데이터
  const title = "테스트입니다";
  const day = "날짜입니다";
  const question = "테스트질문입니다";
  const questionId = 1;
  const meetingId = 1;

  // 이미지
  const [ImgFile, setImgFile] = useState<File | undefined>();
  const [tmpImg, settmpImg] = useState<string>("");
  // 답변
  const [answer, setAnswer] = useState<string>("");
  // 답변 입력하면 answer에 넣어줌
  const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  // 이미지 업로드 및 미리보기
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          settmpImg(e.target.result as string);
          setImgFile(files[0]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // 버튼 눌렀을 때 api로 데이터 전송
  const handleSaveBtn = () => {
    // formData에 이미지, 답변 저장
    const formData = new FormData();
    const data = JSON.stringify({
      answer: answer,
      meetingId: meetingId,
      questionId: questionId,
    });
    const jsonData = new Blob([data], { type: "application/json" });
    formData.append("data", jsonData);
    if (ImgFile) {
      formData.append("image", ImgFile);
    }
    // @ts-ignore
    for (let value of formData.values()) {
      console.log(value);
    }

    // 최초 입력
    createAnswer(formData);

    // 수정
  };

  return (
    <>
      <NameContainer>
        {title} D-{day}
      </NameContainer>
      <QuestionDiv>{question}</QuestionDiv>
      <ImgContainer BgImg={tmpImg}>
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
      </ImgContainer>
      <TextContainer>
        <ContentContainer onChange={handleAnswer}>{answer}</ContentContainer>
      </TextContainer>
      <GhostBtn label="저장하기" onClick={handleSaveBtn}></GhostBtn>
    </>
  );
}
