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
import SubLayout from "./Layout/SubLayout";
import HomePage from "./pages/HomePage/HomePage";
import MyPage from "./pages/MyPage/MyPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotifyPage from "./pages/NotifyPage/NotifyPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import InvitePage from "./pages/InvitePage/InvitePage";
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
import AdminPageAdmin from "./pages/AdminPage/AdminPageAdmin";
import AdminPageTag from "./pages/AdminPage/AdminPageTag";
import AdminPageGroup from "./pages/AdminPage/AdminPageGroup";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const currentPath = location.pathname;

  if (isLogin && accessToken) {
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

  useEffect(() => {
    if (!isLogin && currentPath !== "/login" && currentPath !== "/oauth") {
      navigate("/login");
      if (currentPath !== "/setting") {
        dispatch(updateRouteHistory(currentPath));
      }
    } else if (isLogin && currentPath === "/login") {
      navigate("/home");
    }

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
        htmlTitle!.innerHTML = "문의사항 - Rollwrite";
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

    const rootElement = document.querySelector("#root") as HTMLElement;
    if (currentPath.split("/")[1] === "admin") {
      rootElement.style.minWidth = "0";
      rootElement.style.maxWidth = "100vw";
    }
  });

  return (
    <>
      <Notification />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/question" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
        <Route path="/" element={<SubLayout />}>
          <Route path="/notify" element={<NotifyPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/invite/:meetingId" element={<InvitePage />} />
          <Route path="/answer" element={<AnswerPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth" element={<OauthPage />} />
        <Route path="/result/:meetingId" element={<ResultPage />} />
        <Route path="/join/:inviteCode" element={<JoinPage />} />
        <Route path="/award/:meetingId" element={<AwardPage />} />
        <Route path="/create" element={<CreateGroupPage />} />
        <Route path="*" element={<ErrorPage />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPageIndex />} />
          <Route path="/admin/notice" element={<AdminPageNotice />} />
          <Route path="/admin/admin" element={<AdminPageAdmin />} />
          <Route path="/admin/user" element={<AdminPageUser />} />
          <Route path="/admin/tag" element={<AdminPageTag />} />
          <Route path="/admin/group" element={<AdminPageGroup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
