import React, { useState, useEffect } from "react";
import { HeaderContainer, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../../assets/Logo.svg";
import { ReactComponent as Setting } from "../../../assets/Setting.svg";
import { ReactComponent as User } from "../../../assets/User.svg";
import { useLocation, useNavigate } from "react-router-dom";
import BackNavigation from "../BackNavigation/BackNavigation";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle("");
    const HEADER_LIST = [
      { text: "알림", path: "/notify" },
      { text: "설정", path: "/setting" },
      { text: "공지사항", path: "/notice" },
      { text: "의견 보내기", path: "/inquiry" },
      { text: " ", path: "/answer" },
    ];

    HEADER_LIST.map((header) =>
      header.path === location.pathname ? setTitle(header.text) : ""
    );
  }, [location]);

  return title.length > 0 ? (
    <BackNavigation title={title} />
  ) : (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")} />
      <BtnContainer>
        <User onClick={() => navigate("/my")} />
        <Setting onClick={() => navigate("/setting")} />
      </BtnContainer>
    </HeaderContainer>
  );
}

export default Header;
