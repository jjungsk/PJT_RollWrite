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

  const title = "테스트입니다";
  const day = "날짜입니다";
  const question = "테스트질문입니다";

  const [ImgFile, setImgFile] = useState<File | undefined>();
  const [tmpImg, settmpImg] = useState<string>("");
  // 답변
  const [answer, setAnswer] = useState<string>();
  // 답변 입력하면 answer에 넣어줌
  const handleAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    console.log(e.target.value);
  };

  // form 데이터에 사진, 답변 저장
  // const formData = new FormData();
  // formData.append("answer", answer);
  // formData.append("image", ImgFile);

  // api 연결해서 데이터 저장

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

  return (
    <>
      <NameContainer>
        {title} D-{day}
      </NameContainer>
      <QuestionDiv>{question}</QuestionDiv>
      <ImgContainer BgImg={tmpImg}>
        <IconContainer>
          <label htmlFor="profile-img">
            <img src={Btn} alt="" />
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
        <ContentContainer onChange={handleAnswer}></ContentContainer>
      </TextContainer>
      <GhostBtn label="저장하기"></GhostBtn>
    </>
  );
}
