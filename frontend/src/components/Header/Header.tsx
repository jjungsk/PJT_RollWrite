import React, { useEffect, useState } from "react";
import { HeaderContainer, HeaderTitle, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { ReactComponent as Notification } from "../../assets/Notification.svg";
import NavBtn from "../../elements/Button/NavBtn";
import { useLocation, useNavigate } from "react-router-dom";

function Header(props: { sub?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate(-1);
  };

  return (
    <HeaderContainer>
      {props.sub && (
        <>
          <Back onClick={handleClickBackBtn} />
          <HeaderTitle>{title}</HeaderTitle>
          <div style={{ width: "40px", height: "30px" }}></div>
        </>
      )}
      {!props.sub && (
        <>
          <Logo
            style={{ width: "auto", height: "36px" }}
            onClick={() => handleClickBtn("/")}
          />
          <BtnContainer>
            <NavBtn
              icon={Notification}
              onClick={() => handleClickBtn("/notify")}
            />
            <NavBtn icon={Setting} onClick={() => handleClickBtn("/setting")} />
          </BtnContainer>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;
