import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./constants/types";
import { updateAccessToken, updateRouteHistory } from "./store/authReducer";
import { axiosFileInstance, axiosInstance } from "./apis/instance";

import MainLayout from "./Layout/MainLayout";
import MyPage from "./pages/MyPage/MyPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotifyPage from "./pages/NotifyPage/NotifyPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import AwardPage from "./pages/AwardPage/AwardPage";
import OauthPage from "./pages/OauthPage/OauthPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NoticePage from "./pages/NoticePage/NoticePage";
import InquiryPage from "./pages/InquiryPage/InquiryPage";
import Notification from "./utils/Notification";
import { AxiosInstance } from "axios";
import { persistor } from "./store/store";
import AdminLayout from "./pages/AdminPage/AdminLayout";
import AdminPageIndex from "./pages/AdminPage/AdminPageIndex";
import AdminPageUser from "./pages/AdminPage/AdminPageUser";
import AdminPageNotice from "./pages/AdminPage/AdminPageNotice";
import AdminPageTag from "./pages/AdminPage/AdminPageTag";
import AdminPageGroup from "./pages/AdminPage/AdminPageGroup";
import AdminPageInquiry from "./pages/AdminPage/AdminPageInquiry";
import { toast } from "react-hot-toast";
import GroupInfoPage from "./pages/GroupInfoPage/GroupInfoPage";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzcwNzc4MjAwIiwicm9sZSI6IkFETUlOIiwiaXNzIjoicm9sbHdyaXRlLmNvLmtyIiwiZXhwIjoxNjg0MTMxODk4LCJpYXQiOjE2ODQwNDU0OTh9.Gs6yrPbwedzAUjxoiJBgyR-oXj3x0FICOqhwb-GmkO1RdPTyf9QIMpP-DiUAsKrYsaxeejozeKKJCRCYpakLzQ`;
  // const accessToken = useAppSelector((state) => state.auth.accessToken);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const currentPath = location.pathname;

  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    axiosFileInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  const purge = async () => {
    await persistor.purge();
  };

  // 토큰 갱신
  const updateToken = async (instance: AxiosInstance, error: any) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.data.statusCode === 401) {
      try {
        // 갱신 요청
        axiosInstance.defaults.headers.common["Authorization"] = null;
        const res = await axiosInstance.post<any>(`auth/reissue`);
        const newAccessToken = res.data.data.accessToken;
        dispatch(updateAccessToken(newAccessToken));
        // 실패했던 요청 새로운 accessToken으로 헤더 변경하고 재요청
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        // 갱신 실패시 임의 로그아웃 처리
        purge();
      }
    } else if (response.status === 403) {
      toast.error("⛔접근 권한이 없습니다.");
      navigate("");
    }
    return Promise.reject(error);
  };

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      updateToken(axiosInstance, error);
    }
  );
  axiosFileInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      updateToken(axiosFileInstance, error);
    }
  );

  const detectMobileDevice = (agent: string) => {
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(agent);
  };
  const detectIphoneDevice = (agent: string) => {
    const iPhoneRegex = /(iPhone|iPod)/i;
    return iPhoneRegex.test(agent);
  };
  const detectInAppBrowser = (agent: string) => {
    const inAppRegex = [
      /KAKAOTALK/i,
      /Instagram/i,
      /NAVER/i,
      /zumapp/i,
      /whale/i,
      /FB/i,
      /Snapchat/i,
      /Line/i,
      /everytimeApp/i,
      /WhatsApp/i,
      /Electron/i,
      /wadiz/i,
      /AliApp/i,
      /FB_IAB/i,
      /FB4A/i,
      /FBAN/i,
      /FBIOS/i,
      /FBSS/i,
      /SamsungBrowser/i,
    ];
    return inAppRegex.some((mobile) => agent.match(mobile));
  };
  const isMobile = detectMobileDevice(window.navigator.userAgent);
  const isIphone = detectIphoneDevice(window.navigator.userAgent);
  const isInApp = detectInAppBrowser(window.navigator.userAgent);

  useEffect(() => {
    if (isMobile && isInApp) {
      if (!isIphone) {
        window.close();
        window.location.href = `intent://${
          process.env.REACT_APP_SERVER_URL?.split("//")[1]
        }${currentPath}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    }

    // if (!isLogin && currentPath !== "/login" && currentPath !== "/oauth") {
    //   navigate("/login");
    //   if (currentPath !== "/setting") {
    //     dispatch(updateRouteHistory(currentPath));
    //   }
    // } else if (isLogin && currentPath === "/login") {
    //   navigate("/home");
    // }

    const pathParts = currentPath.split("/");
    const htmlTitle = document.querySelector("title");
    switch (pathParts[1]) {
      case "login":
        htmlTitle!.innerHTML = "로그인 - Rollwrite";
        break;
      case "home":
        htmlTitle!.innerHTML = "홈 - Rollwrite";
        break;
      case "question":
        htmlTitle!.innerHTML = "오늘의 질문 - Rollwrite";
        break;
      case "answer":
        htmlTitle!.innerHTML = "답변 작성하기 - Rollwrite";
        break;
      case "my":
        htmlTitle!.innerHTML = "마이페이지 - Rollwrite";
        break;
      case "notify":
        htmlTitle!.innerHTML = "알림 - Rollwrite";
        break;
      case "setting":
        htmlTitle!.innerHTML = "설정 - Rollwrite";
        break;
      case "notice":
        htmlTitle!.innerHTML = "공지사항 - Rollwrite";
        break;
      case "inquiry":
        htmlTitle!.innerHTML = "의견 보내기 - Rollwrite";
        break;
      case "service":
        htmlTitle!.innerHTML = "서비스 이용약관 - Rollwrite";
        break;
      case "invite":
        htmlTitle!.innerHTML = "모임 초대하기 - Rollwrite";
        break;
      case "result":
        htmlTitle!.innerHTML = "모임 상세보기 - Rollwrite";
        break;
      case "create":
        htmlTitle!.innerHTML = "모임 생성하기 - Rollwrite";
        break;
      case "join":
        htmlTitle!.innerHTML = "모임 가입하기 - Rollwrite";
        break;
      case "award":
        htmlTitle!.innerHTML = "모임 결과 - Rollwrite";
        break;
      case "admin":
        htmlTitle!.innerHTML = "관리자 - Rollwrite";
        break;
      default:
        break;
    }
  });

  return (
    <>
      {/* <Notification /> */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/question" />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/notify" element={<NotifyPage />} />
          <Route path="/answer" element={<AnswerPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth" element={<OauthPage />} />
        <Route path="/result/:meetingId" element={<ResultPage />} />
        <Route path="/join/:inviteCode" element={<JoinPage />} />
        <Route path="/award/:meetingId" element={<AwardPage />} />
        <Route path="/create" element={<CreateGroupPage />} />
        <Route path="/group/:meetingId" element={<GroupInfoPage />} />
        <Route path="*" element={<ErrorPage />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPageIndex />} />
          <Route path="/admin/notice" element={<AdminPageNotice />} />
          <Route path="/admin/user" element={<AdminPageUser />} />
          <Route path="/admin/tag" element={<AdminPageTag />} />
          <Route path="/admin/group" element={<AdminPageGroup />} />
          <Route path="/admin/inquiry" element={<AdminPageInquiry />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
