import React from "react";
import { HeaderContainer, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { ReactComponent as Notification } from "../../assets/Notification.svg";
import NavBtn from "../../elements/Button/NavBtn";
import { useNavigate } from "react-router-dom";

function Header(props: { sub?: boolean }) {
  const navigate = useNavigate();

  const handleClickBtn = (path: string) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      {props.sub && (
        <>
          <h1>헤더!!</h1>
        </>
      )}
      {!props.sub && (
        <>
          <Logo onClick={() => handleClickBtn("/")} />
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
