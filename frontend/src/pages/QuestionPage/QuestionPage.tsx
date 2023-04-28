import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // 추가로 구현해야할 부분
  // 1. 리스트 크기에 따른 분기(화살표 보이게/안보이게)
  // 2. 슬라이더 구현 -> swiper js
  // 3. 리스트 순서 정렬(answer 없는순>meetingId 낮은순)

  return (
    <>
      {hasQuestion &&
        questionList.map((item: QuestionInfo, idx: number) => {
          return (
            <>
              {/* 모임 있는 경우 */}
              <InfoContainer>
                <DateContainer>{today}</DateContainer>
                <NameContainer>
                  {item.title} D-{item.day}
                </NameContainer>
              </InfoContainer>
              <EmojiContainer>
                <ArrowContainer>
                  {idx !== 0 && <BackArrow></BackArrow>}
                </ArrowContainer>
                <Emoji label={item.emoji}></Emoji>
                <ArrowContainer>
                  {idx !== questionList.length - 1 && <PrevArrow></PrevArrow>}
                </ArrowContainer>
              </EmojiContainer>
              <TextContainer>{item.question}</TextContainer>
              <BtnContainer>
                <GhostBtn
                  label="입력하기"
                  onClick={() =>
                    navigate("/answer", {
                      state: {
                        title: item.title,
                        day: item.day,
                        question: item.question,
                      },
                    })
                  }
                ></GhostBtn>
              </BtnContainer>
            </>
          );
        })}
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
