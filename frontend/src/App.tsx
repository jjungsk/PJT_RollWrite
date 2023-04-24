import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import MyPage from "./pages/MyPage/MyPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotifyPage from "./pages/NotifyPage/NotifyPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import SubLayout from "./Layout/SubLayout";

function App() {
  // TODO: 임시 로그인 state 처리
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        {!isLogin && <Route path="/" element={<Navigate to="/login" />} />}
        {isLogin && <Route path="/" element={<Navigate to="/question" />} />}
        <Route path="/home" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>
      <Route path="/" element={<SubLayout />}>
        <Route path="/notify" element={<NotifyPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
