import React, { useEffect, useState } from "react";
import "swiper/css";

import EmojiCarousel from "../../components/Organism/EmojiCarousel/EmojiCarousel";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { Question } from "../../constants/types";
import { getQuestionList } from "../../apis/question";
import {
  QuestionPageAnswer,
  QuestionPageContainer,
  QuestionPageHeader,
  QuestionPageQuestion,
} from "./style";
import { format } from "date-fns";
import Box from "../../components/Atom/Box/Box";
import Btn from "../../components/Atom/Btn/Btn";
import { useNavigate } from "react-router-dom";

function QuestionPage() {
  const [questionList, setQuestionList] = useState<Question[]>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const navigate = useNavigate();
  const today = format(new Date(), "yyyy.MM.dd");

  useEffect(() => {
    getQuestionList().then((res) => {
      console.log(res.data);
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
            <div>{today}</div>
            <div>
              <Box height="24px" width="24px" />
              D-
              {questionList[currentSlide].day > 0
                ? questionList[currentSlide].day
                : "day"}
              <Home />
            </div>
            <div>{questionList[currentSlide].title}</div>
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
