import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Organism/Header/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <main
        style={{
          height: "calc(100% - 48px)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
