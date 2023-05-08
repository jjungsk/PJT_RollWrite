import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./constants/types";
import {
  resetAuthState,
  updateAccessToken,
  updateRouteHistory,
} from "./store/authReducer";
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
        dispatch(resetAuthState);
      }
    } else {
      navigate("/login");
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
      dispatch(updateRouteHistory(currentPath));
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
      </Routes>
    </>
  );
}

export default App;
