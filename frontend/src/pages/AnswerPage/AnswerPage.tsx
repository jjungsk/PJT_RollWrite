import React, { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  NameContainer,
  QuestionDiv,
  ImgContainer,
  IconContainer,
} from "./style";
import TextArea from "../../elements/TextArea/TextArea";
import GhostBtn from "../../elements/Button/GhostBtn";
import Btn from "../../assets/AddImgBtn.svg";

// 추가로 구현해야할 부분
// 1. 데이터 저장, 수정 api 연결
// 2. 디폴트 이미지 넣기

export default function AnswerPage() {
  // const location = useLocation();
  // const state = location.state as {
  //   title: string;
  //   day: number;
  //   question: string;
  // };
  // const title = state.title;
  // const day = state.day;
  // const question = state.question;

  const title = "테스트입니다";
  const day = "날짜입니다";
  const question = "테스트질문입니다";

  const [profileImgFile, setProfileImgFile] = useState<File | undefined>();
  const [tmpProfileImg, setTmpProfileImg] = useState<string>("");

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setTmpProfileImg(e.target.result as string);
          setProfileImgFile(files[0]);
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
      <ImgContainer BgImg={tmpProfileImg}>
        <IconContainer>
          <label htmlFor="profile-img">
            <img src={Btn} alt="" />
          </label>
        </IconContainer>
        <input
          id="profile-img"
          type="file"
          accept="image/*"
          onChange={handleProfileImg}
          style={{ display: "none" }}
        />
      </ImgContainer>
      <TextArea></TextArea>
      <GhostBtn label="저장하기"></GhostBtn>
    </>
  );
}
