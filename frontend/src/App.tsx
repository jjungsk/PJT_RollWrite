import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./constants/types";
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
import AdminLayout from "./pages/AdminPage/AdminLayout";
import AdminPageIndex from "./pages/AdminPage/AdminPageIndex";
import AdminPageUser from "./pages/AdminPage/AdminPageUser";
import AdminPageNotice from "./pages/AdminPage/AdminPageNotice";
import AdminPageTag from "./pages/AdminPage/AdminPageTag";
import AdminPageGroup from "./pages/AdminPage/AdminPageGroup";
import AdminPageInquiry from "./pages/AdminPage/AdminPageInquiry";
import GroupInfoPage from "./pages/GroupInfoPage/GroupInfoPage";
import useTokenInterceptor from "./hooks/useTokenInterceptor";
import useMobileDeviceDetection from "./hooks/useMobileDeviceDetection";
import useLoginRedirect from "./hooks/useLoginRedirect";
import useHtmlTitle from "./hooks/useHtmlTitle";
import useResize from "./hooks/useResize";
import ManualPage from "./pages/ManualPage/ManualPage";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  if (isLogin && accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    axiosFileInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  useTokenInterceptor(dispatch);
  useMobileDeviceDetection();
  useLoginRedirect(dispatch);
  useHtmlTitle();
  useResize();

  return (
    <>
      <Notification />
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
        <Route path="/manual" element={<ManualPage />} />
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
