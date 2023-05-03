export const handleKakaoClick = (url: string) => {
  const shareUrl = url;

  (window as any).Kakao.Share.sendDefault({
    objectType: "text",
    text: "당신을 초대합니다",
    link: {
      mobileWebUrl: shareUrl,
      webUrl: shareUrl,
    },
  });
};
