import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chat, GroupResult } from "../../constants/types";
import {
  HeaderContainer,
  HeaderGroupTitle,
} from "../../components/Header/style";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as HamburgerMenu } from "../../assets/Hamburger_Menu.svg";
import { ReactComponent as Person } from "../../assets/Person.svg";
import Contour from "../../elements/Contour/Contour";
import {
  AnswerContainer,
  AnswerDetail,
  ChatContainer,
  QuestionContainer,
} from "./style";
import { ProfileImg } from "../MyPage/style";

function ResultPage() {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [groupResult, setGroupResult] = useState<GroupResult>({
    meetingId: 0,
    title: "모임명",
    startDay: "2023-01-01",
    endDay: "2023-01-01",
    color: "var(--bg-color)",
    participant: [],
    participantCnt: 0,
    tag: [],
    statistic: {
      taleteller: [],
      photographer: [],
      proGagler: [],
    },
    chat: [],
  });

  useEffect(() => {
    // TODO: meetingId에 해당하는 모임 상세 결과 호출
    console.log(`${meetingId}번 모임 결과 요청`);
    const groupResultData = {
      meetingId: 1,
      title: "싸피에서 즐거운 시간",
      startDay: "2023-04-18",
      endDay: "2023-04-25",
      color: "var(--blue-color)",
      participant: [
        {
          userId: 1,
          nickname: "닉네임1",
          profileImage: "/sample_profile_image.png",
        },
        {
          userId: 2,
          nickname: "닉네임2",
          profileImage: "/sample_profile_image.png",
        },
        {
          userId: 3,
          nickname: "닉네임3",
          profileImage: "/sample_profile_image.png",
        },
        {
          userId: 4,
          nickname: "닉네임4",
          profileImage: "/sample_profile_image.png",
        },
        {
          userId: 5,
          nickname: "닉네임5",
          profileImage: "/sample_profile_image.png",
        },
      ],
      participantCnt: 5,
      tag: [
        { tagId: 1, content: "대학생" },
        { tagId: 2, content: "학생" },
        { tagId: 3, content: "취업" },
      ],
      statistic: {
        taleteller: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImage: "/sample_profile_image.png",
          },
          {
            userId: 2,
            nickname: "닉네임2",
            profileImage: "/sample_profile_image.png",
          },
        ],
        photographer: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImage: "/sample_profile_image.png",
          },
        ],
        proGagler: [
          {
            userId: 1,
            nickname: "닉네임1",
            profileImage: "/sample_profile_image.png",
          },
        ],
      },
      chat: [
        {
          day: "2023-03-16",
          questionId: 1,
          question: "프로젝트를 하면서 가장 좋았던 팀원은 누구인가요?",
          answer: [
            {
              nickname: "닉네임1",
              profileImage: "/sample_profile_image.png",
              isMe: true,
              content:
                "내가 가장 좋은 팀원이지!!! 블라블라 블라블라 블라블라 블라블라 블라블라 블라블라 블라블라 ",
              time: "2023-03-16 10:10:10",
            },
            {
              nickname: "닉네임2",
              profileImage: "/sample_profile_image.png",
              isMe: false,
              content: "모두 사랑합니다",
              time: "2023-03-16 14:21:52",
            },
          ],
        },
        {
          day: "2023-03-17",
          questionId: 2,
          question:
            "질문 최대 길이 질문 최대 길이 질문 최대 길이 질문 최대 길이 질문",
          answer: [
            {
              nickname: "닉네임1",
              profileImage: "/sample_profile_image.png",
              isMe: false,
              content:
                "이건 답변 내용이야 이건 답변 내용이야 이건 답변 내용이야 이건 답변 내용이야 이건 답변 내용이야 이건 답변 내용이야 이건 답변 내용이야 이건 답변 내용이야",
              time: "2023-03-17 11:10:10",
            },
            {
              nickname: "닉네임2",
              profileImage: "/sample_profile_image.png",
              isMe: true,
              content: "이건 짧은 답변이야",
              time: "2023-03-17 15:41:31",
            },
          ],
        },
      ],
    };

    setGroupResult(groupResultData);
  }, [meetingId]);

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  const handleClickMenuBtn = () => {
    alert("메뉴 열린다!!");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <HeaderContainer padding={"0px 24px 0px 24px"}>
        <Back onClick={handleClickBackBtn} />
        <HeaderGroupTitle>
          <div>
            <div>{groupResult.title}</div>
            <Person />
            <div>{groupResult.participantCnt}</div>
          </div>
          <div>
            {groupResult.startDay.replace(/-/g, ".")}
            {" ~ "}
            {groupResult.endDay.replace(/-/g, ".")}
          </div>
        </HeaderGroupTitle>
        <HamburgerMenu onClick={handleClickMenuBtn} />
      </HeaderContainer>

      <main
        style={{
          flex: "1",
          overflow: "scroll",
        }}
      >
        {groupResult.chat.map((chat: Chat) => (
          <ChatContainer key={chat.questionId}>
            <Contour text={chat.day.replace(/-/g, ".")} />
            <QuestionContainer bgColor={groupResult.color}>
              {chat.question}
            </QuestionContainer>
            {chat.answer.map((answer) => (
              <AnswerContainer key={answer.time} isMe={answer.isMe}>
                <ProfileImg
                  style={{ backgroundImage: `url(${answer.profileImage})` }}
                />
                <AnswerDetail>
                  <div>{answer.nickname}</div>
                  <div>
                    <div>{answer.content}</div>
                    <div>{answer.time.split(" ")[1]}</div>
                  </div>
                </AnswerDetail>
              </AnswerContainer>
            ))}
          </ChatContainer>
        ))}
      </main>
    </div>
  );
}

export default ResultPage;
