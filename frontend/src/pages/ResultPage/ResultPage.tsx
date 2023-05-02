import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Chat, GroupResult } from "../../constants/types";
import {
  HeaderContainer,
  HeaderGroupTitle,
} from "../../components/Header/style";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as HamburgerMenu } from "../../assets/Hamburger_Menu.svg";
import { ReactComponent as Person } from "../../assets/Person.svg";
import { ResultContainer } from "./style";
import format from "date-fns/format";
import SideMenu from "../../components/SideMenu/SideMenu";
import ChatItem from "../../components/ChatItem/ChatItem";
import ChatAwardItem from "../../components/ChatAwardItem/ChatAwardItem";

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
    award: {
      taleteller: [],
      photographer: [],
      proGagler: [],
    },
    chat: [],
  });
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

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
      award: {
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
            {
              nickname: "닉네임3",
              profileImage: "/sample_profile_image.png",
              isMe: false,
              content: "대선이가 이 세상에서 가장 좋아요!!",
              time: "2023-03-16 15:45:12",
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
        {
          day: "2023-03-18",
          questionId: 3,
          question: "오늘의 질문 내용 블라 블라",
          answer: [
            {
              nickname: "닉네임1",
              profileImage: "/sample_profile_image.png",
              isMe: false,
              content: "이건 답변 내용이야 이건 답변 내용이야",
              time: "2023-03-18 16:52:10",
            },
            {
              nickname: "닉네임2",
              profileImage: "/sample_profile_image.png",
              isMe: false,
              content: "이건 짧은 답변이야",
              time: "2023-03-18 17:38:31",
            },
          ],
        },
      ],
    };

    setGroupResult(groupResultData);
  }, [meetingId]);

  const handleClickBackBtn = () => {
    navigate("/my");
  };

  const handleClickMenuBtn = () => {
    setSideMenuOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {sideMenuOpen && (
          <SideMenu
            groupResult={groupResult}
            sideMenuOpen={sideMenuOpen}
            handleSideMenuOpen={setSideMenuOpen}
          />
        )}
      </AnimatePresence>
      <HeaderContainer padding={"0px 24px 0px 24px"}>
        <Back onClick={handleClickBackBtn} />
        <HeaderGroupTitle>
          <div>
            <div>{groupResult.title}</div>
            <Person />
            <div>{groupResult.participantCnt}</div>
          </div>
          <div>
            {format(new Date(groupResult.startDay), "yyyy.MM.dd")}
            {" ~ "}
            {format(new Date(groupResult.endDay), "yyyy.MM.dd")}
          </div>
        </HeaderGroupTitle>
        <HamburgerMenu onClick={handleClickMenuBtn} />
      </HeaderContainer>

      <ResultContainer id="Result-Container">
        {groupResult.chat.map((chat: Chat) => (
          <ChatItem
            key={chat.questionId}
            chat={chat}
            bgColor={groupResult.color}
          />
        ))}
        <ChatAwardItem award={groupResult.award} bgColor={groupResult.color} />
        <div></div>
      </ResultContainer>
    </>
  );
}

export default ResultPage;
