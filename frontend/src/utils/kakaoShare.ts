import { CalendarQuestion, Group } from "../constants/types";

export const handleKakaoInviteShare = (group: Group) => {
  const shareUrl = group.inviteUrl;

  (window as any).Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: `${group.title}에서 당신을 초대합니다.`,
      description:
        "우리 함께한 시간, 소중한 추억을 그냥 흘려보내지 않겠어요! 지금 바로 Rollwrite에 참여하세요! 친구들, 가족, 동료들과의 소중한 시간을 마음을 담아 기록하고,나중에 되돌아봤을 때 따뜻한 미소를 띄울 수 있는 그 날의 기억을 되살릴 수 있습니다.",
      imageUrl: `${process.env.REACT_APP_SERVER_URL}/logo_square.png`,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "자세히 보기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
};

export const handleKakaoQuestionShare = (question: CalendarQuestion) => {
  const shareUrl = `${process.env.REACT_APP_SERVER_URL}/question`;

  (window as any).Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: `오늘 질문의 답변을 빨리 달아주세요 🙏`,
      description: `오늘의 질문 : ${question.question}`,
      imageUrl: `${process.env.REACT_APP_SERVER_URL}/logo_square.png`,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    social: {
      commentCount: question.answerCnt,
    },
    buttons: [
      {
        title: "자세히 보기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
};
