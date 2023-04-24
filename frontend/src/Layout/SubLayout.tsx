import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function SubLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        backgroundColor: "#F0EDE6",
      }}
    >
      <Header sub />
      <main
        style={{
          flex: "1",
          overflow: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default SubLayout;
