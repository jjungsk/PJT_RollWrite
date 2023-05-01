import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import MyPage from "./pages/MyPage/MyPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotifyPage from "./pages/NotifyPage/NotifyPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import SubLayout from "./Layout/SubLayout";
import { useAppDispatch, useAppSelector } from "./constants/types";
import { updateRouteHistory } from "./store/authReducer";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import InvitePage from "./pages/InvitePage/InvitePage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import AwardPage from "./pages/AwardPage/AwardPage";
import OauthPage from "./pages/OauthPage/OauthPage";
import { axiosInstance } from "./apis/instance";

function App() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  // 헤더 디폴트 추가
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogin = useAppSelector((state) => state.auth.accessToken).length > 0;
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (!isLogin) {
      if (currentPath !== "/login") {
        console.log("a");
        dispatch(updateRouteHistory(currentPath));
      }
      console.log("b");
      navigate("/login");
    }

    if (isLogin) {
      if (currentPath === "/login") {
        navigate("");
      }
      if (routeHistory !== "") {
        navigate(routeHistory);
        dispatch(updateRouteHistory(""));
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth" element={<OauthPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/question" />} />
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
      <Route path="/result/:meetingId" element={<ResultPage />} />
      <Route path="/join/:inviteCode" element={<JoinPage />} />
      <Route path="/award/:meetingId" element={<AwardPage />} />
      <Route path="/create" element={<CreateGroupPage />} />
    </Routes>
  );
}

export default App;
