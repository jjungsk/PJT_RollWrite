import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  InfoContainer,
  DateContainer,
  NameContainer,
  EmojiContainer,
  ArrowContainer,
  TextContainer,
  BtnContainer,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import Emoji from "../../elements/Emoji/Emoji";
import { ReactComponent as BackArrow } from "../../assets/Back_Btn.svg";
import { ReactComponent as PrevArrow } from "../../assets/Prev_Btn.svg";
import { QuestionInfo } from "../../constants/types";
import { getQuestionList } from "../../apis/question";

function QuestionPage() {
  const navigate = useNavigate();
  var today = new Date().toLocaleDateString();

  const [hasQuestion, setHasQuestion] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<QuestionInfo[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [swiper, setSwiper] = useState<any>(null);

  const nextTo = () => {
    swiper?.slideNext();
  };

  const backTo = () => {
    swiper?.slidePrev();
  };

  useEffect(() => {
    getQuestionList()
      .then((res) => {
        setQuestionList(res.data);
        if (res.data.length !== 0) {
          setHasQuestion(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {hasQuestion && (
        <>
          {/* 모임 있는 경우 */}
          <InfoContainer>
            <DateContainer>{today}</DateContainer>
            <NameContainer>
              {questionList[currentSlide].title} D-
              {questionList[currentSlide].day}
            </NameContainer>
          </InfoContainer>
          <EmojiContainer>
            <ArrowContainer>
              {currentSlide !== 0 && <BackArrow onClick={backTo}></BackArrow>}
            </ArrowContainer>
            <Swiper
              style={{ width: "200px", overflow: "hidden" }}
              slidesPerView={1}
              onRealIndexChange={(element) =>
                setCurrentSlide(element.activeIndex)
              }
              onSwiper={(s) => {
                setSwiper(s);
              }}
            >
              {questionList.map((item: QuestionInfo, idx: number) => (
                <SwiperSlide key={idx}>
                  <Emoji label={item.emoji}></Emoji>
                </SwiperSlide>
              ))}
            </Swiper>
            <ArrowContainer>
              {currentSlide !== questionList.length - 1 && (
                <PrevArrow onClick={nextTo}></PrevArrow>
              )}
            </ArrowContainer>
          </EmojiContainer>
          <TextContainer>{questionList[currentSlide].question}</TextContainer>
          <BtnContainer>
            <GhostBtn
              label="입력하기"
              onClick={() =>
                navigate("/answer", {
                  state: {
                    title: questionList[currentSlide].title,
                    day: questionList[currentSlide].day,
                    question: questionList[currentSlide].question,
                    questionId: questionList[currentSlide].questionId,
                    meetingId: questionList[currentSlide].meetingId,
                  },
                })
              }
            ></GhostBtn>
          </BtnContainer>
        </>
      )}

      {!hasQuestion && (
        <>
          {/* 모임 없는 경우 */}
          <InfoContainer>
            <DateContainer>{today}</DateContainer>
          </InfoContainer>
          <EmojiContainer>
            <Emoji label="🤔"></Emoji>
          </EmojiContainer>
          <TextContainer>
            음.. 모임이 없습니다 <br /> 모임을 만들든가 들어가든가 하세요
          </TextContainer>
          <BtnContainer>
            <GhostBtn
              label="모임 만들기"
              onClick={() => navigate("/create")}
            ></GhostBtn>
          </BtnContainer>
        </>
      )}
    </>
  );
}

export default QuestionPage;
