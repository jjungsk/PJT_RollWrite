import React, { useEffect, useState } from "react";
import "swiper/css";

import EmojiCarousel from "../../components/Organism/EmojiCarousel/EmojiCarousel";
import EastIcon from "@mui/icons-material/East";
import { Question } from "../../constants/types";
import { getQuestionList } from "../../apis/question";
import {
  QuestionPageAnswer,
  QuestionPageContainer,
  QuestionPageHeader,
  QuestionPageQuestion,
} from "./style";
import { format } from "date-fns";
import Btn from "../../components/Atom/Btn/Btn";
import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";

function QuestionPage() {
  const [questionList, setQuestionList] = useState<Question[]>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const navigate = useNavigate();
  const today = format(new Date(), "yyyy.MM.dd");

  useEffect(() => {
    getQuestionList().then((res) => {
      setQuestionList(res.data);
    });
  }, []);

  return (
    <QuestionPageContainer>
      {questionList && (
        <>
          <QuestionPageHeader
            onClick={() =>
              navigate(`/group/${questionList[currentSlide].meetingId}`)
            }
          >
            <div>
              {today}
              {" ( D-"}
              {questionList[currentSlide].day > 0
                ? questionList[currentSlide].day
                : "day"}
              {" )"}
            </div>
            <div
              style={{ fontSize: "22px", lineHeight: "48px", height: "48px" }}
            >
              {questionList[currentSlide].title.length > 15
                ? questionList[currentSlide].title.slice(0, 15) + "..."
                : questionList[currentSlide].title}
            </div>
            <div
              style={{
                justifyContent: "end",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              모임 상세보기
              <Icon>
                <EastIcon />
              </Icon>
            </div>
          </QuestionPageHeader>
          <EmojiCarousel
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            questionList={questionList}
          />
          <QuestionPageQuestion>
            {questionList[currentSlide].question}
          </QuestionPageQuestion>
          <QuestionPageAnswer>
            {questionList[currentSlide].answer}
          </QuestionPageAnswer>
          <Btn
            label={
              questionList[currentSlide].answer ? "수정 하기" : "입력 하기"
            }
            onClick={() => {
              navigate("/answer", {
                state: {
                  question: questionList[currentSlide],
                  isModify: questionList[currentSlide].answer,
                },
              });
            }}
          />
        </>
      )}
    </QuestionPageContainer>
  );
}

export default QuestionPage;
