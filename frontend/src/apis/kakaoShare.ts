export const handleKakaoClick = (url: string) => {
  const shareUrl = url;

  (window as any).Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "안녕하세요",
      description: `모임에 초대합니다.`,
      imageUrl: "/logo512.png",
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "모임 참여하기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
};
