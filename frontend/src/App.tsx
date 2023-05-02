import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./constants/types";
import { updateRouteHistory } from "./store/authReducer";
import { axiosInstance } from "./apis/instance";

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

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  // const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzcwNzc4MjAwIiwicm9sZSI6IlVTRVIiLCJpc3MiOiJyb2xsd3JpdGUuY28ua3IiLCJleHAiOjE2ODMwMDgxMDYsImlhdCI6MTY4MzAwNDUwNn0.hyExKjjQHT95A9Tc7LZ_NCrHSFjkaMCkLgeF9GVwuNans7RqK7AdtZNUGJIDtiwwSOsgXXmTay8W_S9IIKUA1g`;
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const currentPath = location.pathname;
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
  useEffect(() => {
    if (!isLogin && currentPath !== "/login" && currentPath !== "/oauth") {
      navigate("/login");
      dispatch(updateRouteHistory(currentPath));
    }
  });

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
      <Route path="/" element={<SubLayout />}>
        <Route path="/notify" element={<NotifyPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/invite/:meetingId" element={<InvitePage />} />
        <Route path="/answer" element={<AnswerPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth" element={<OauthPage />} />
      <Route path="/result/:meetingId" element={<ResultPage />} />
      <Route path="/join/:inviteCode" element={<JoinPage />} />
      <Route path="/award/:meetingId" element={<AwardPage />} />
      <Route path="/create" element={<CreateGroupPage />} />
    </Routes>
  );
}

export default App;
