import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Organism/Header/Header";
import { ManualIcon } from "../pages/ManualPage/style";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [existManualIcon, setExistManualIcon] = useState<boolean>(false);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/question" || currentPath === "/my") {
      setExistManualIcon(true);
    } else {
      setExistManualIcon(false);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main
        style={{
          height: "calc(100% - 48px)",
          overflow: "auto",
          paddingBottom: "16px",
        }}
      >
        <Outlet />
      </main>
      {existManualIcon && (
        <ManualIcon onClick={() => navigate("/manual")}>?</ManualIcon>
      )}
    </>
  );
}

export default MainLayout;
