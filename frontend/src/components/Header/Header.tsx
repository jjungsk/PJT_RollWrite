import React, { useEffect, useState } from "react";
import { HeaderContainer, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { ReactComponent as Notification } from "../../assets/Notification.svg";
import NavBtn from "../../elements/Button/NavBtn";
import { useLocation, useNavigate } from "react-router-dom";
import BackNavigation from "../BackNavigation/BackNavigation";
import { useAppSelector } from "../../constants/types";

function Header(props: { sub?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const HEADER_LIST = [
      { text: "알림", path: "/notify" },
      { text: "설정", path: "/setting" },
      { text: "공지사항", path: "/notice" },
      { text: "문의사항", path: "/inquiry" },
    ];

    HEADER_LIST.map((header) =>
      header.path === location.pathname ? setTitle(header.text) : ""
    );
  }, [location]);

  const handleClickBtn = (path: string) => {
    navigate(path);
  };

  const handleClickBackBtn = () => {
    if (location.pathname === "/inquiry" || location.pathname === "/notice") {
      navigate("/setting");
    } else if (
      (location.pathname === "/setting" || location.pathname === "/notify") &&
      (routeHistory === "/question" ||
        routeHistory === "/home" ||
        routeHistory === "/my")
    ) {
      navigate(routeHistory);
    } else {
      navigate("");
    }
  };

  return props.sub ? (
    <BackNavigation onClick={handleClickBackBtn} title={title} />
  ) : (
    <HeaderContainer>
      <Logo
        style={{ width: "auto", height: "36px" }}
        onClick={() => handleClickBtn("/")}
      />
      <BtnContainer>
        <NavBtn icon={Notification} onClick={() => handleClickBtn("/notify")} />
        <NavBtn icon={Setting} onClick={() => handleClickBtn("/setting")} />
      </BtnContainer>
    </HeaderContainer>
  );
}

export default Header;
