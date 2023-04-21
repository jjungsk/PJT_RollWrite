import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
