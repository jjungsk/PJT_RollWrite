import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <main
        style={{
          flex: "1",
          overflow: "scroll",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
