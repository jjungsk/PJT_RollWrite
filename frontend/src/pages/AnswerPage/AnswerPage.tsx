import React, { useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  NameContainer,
  QuestionDiv,
  ImgContainer,
  IconContainer,
} from "./style";
import TextArea from "../../elements/TextArea/TextArea";
import GhostBtn from "../../elements/Button/GhostBtn";
import { ReactComponent as ImgBtn } from "../../assets/AddImgBtn.svg";

// 추가로 구현해야할 부분
// 1. 데이터 저장, 수정 api 연결
// 2. 이미지 업로드
// 3. 이미지 미리보기

export default function AnswerPage() {
  const location = useLocation();
  const state = location.state as {
    title: string;
    day: number;
    question: string;
  };
  const title = state.title;
  const day = state.day;
  const question = state.question;

  const imgRef = useRef<HTMLInputElement | null>(null);
  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      console.log(e.target.files[0].name);
    },
    []
  );

  //   const [imgFile, setImgFile] = useState<string | null>(null);
  //   const saveImgFile = () => {
  //     const file = imgRef.current.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImgFile(reader.result);
  //     };
  //   };

  const handleImgBtn = useCallback(() => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  }, []);

  return (
    <>
      <NameContainer>
        {title} D-{day}
      </NameContainer>
      <QuestionDiv>{question}</QuestionDiv>
      <ImgContainer style={{ backgroundImage: "url()" }}>
        <IconContainer>
          <ImgBtn onClick={handleImgBtn}></ImgBtn>
        </IconContainer>
        <input
          type="file"
          accept="image/*"
          id="img"
          ref={imgRef}
          onChange={onImageChange}
          style={{ display: "none" }}
        />
      </ImgContainer>
      <TextArea></TextArea>
      <GhostBtn label="저장하기"></GhostBtn>
    </>
  );
}
