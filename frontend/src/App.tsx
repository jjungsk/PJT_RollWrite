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
import AnswerPage from "./pages/AnswerPage/AnswerPage";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (!isLogin) {
      if (currentPath !== "/login") {
        dispatch(updateRouteHistory(currentPath));
      }
      navigate("/login");
    }

    if (isLogin) {
      if (currentPath == "/login") {
        navigate("");
      }
      if (routeHistory !== "") {
        navigate(routeHistory);
        dispatch(updateRouteHistory(""));
      }
    }
  }, [dispatch, isLogin, location, navigate, routeHistory]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/question" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
      <Route path="/" element={<SubLayout />}>
        <Route path="/notify" element={<NotifyPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/create" element={<CreateGroupPage />} />
        <Route path="/answer" element={<AnswerPage />} />
      </Route>
    </Routes>
  );
}

export default App;
