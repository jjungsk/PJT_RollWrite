import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHtmlTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split("/");
    const htmlTitle = document.querySelector("title");

    if (!htmlTitle) {
      return;
    }

    switch (pathParts[1]) {
      case "login":
        htmlTitle.innerHTML = "로그인 - Rollwrite";
        break;
      case "home":
        htmlTitle.innerHTML = "홈 - Rollwrite";
        break;
      case "question":
        htmlTitle.innerHTML = "오늘의 질문 - Rollwrite";
        break;
      case "answer":
        htmlTitle.innerHTML = "답변 작성하기 - Rollwrite";
        break;
      case "my":
        htmlTitle.innerHTML = "마이페이지 - Rollwrite";
        break;
      case "notify":
        htmlTitle.innerHTML = "알림 - Rollwrite";
        break;
      case "setting":
        htmlTitle.innerHTML = "설정 - Rollwrite";
        break;
      case "notice":
        htmlTitle.innerHTML = "공지사항 - Rollwrite";
        break;
      case "inquiry":
        htmlTitle.innerHTML = "의견 보내기 - Rollwrite";
        break;
      case "service":
        htmlTitle.innerHTML = "서비스 이용약관 - Rollwrite";
        break;
      case "invite":
        htmlTitle.innerHTML = "모임 초대하기 - Rollwrite";
        break;
      case "result":
        htmlTitle.innerHTML = "모임 상세보기 - Rollwrite";
        break;
      case "create":
        htmlTitle.innerHTML = "모임 생성하기 - Rollwrite";
        break;
      case "join":
        htmlTitle.innerHTML = "모임 가입하기 - Rollwrite";
        break;
      case "award":
        htmlTitle.innerHTML = "모임 결과 - Rollwrite";
        break;
      case "admin":
        htmlTitle.innerHTML = "관리자 - Rollwrite";
        break;
      default:
        htmlTitle.innerHTML = "Rollwrite";
        break;
    }
  }, [location]);
};

export default useHtmlTitle;
