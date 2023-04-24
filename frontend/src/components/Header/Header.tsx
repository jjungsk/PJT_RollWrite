import React from "react";
import { HeaderContainer, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { ReactComponent as Notification } from "../../assets/Notification.svg";
import NavBtn from "../../elements/Button/NavBtn";
function Header() {
  const handleClickBtn = () => {
    console.log("a");
  };
  return (
    <HeaderContainer>
      <Logo />
      <BtnContainer>
        <NavBtn icon={Notification} onClick={handleClickBtn} />
        <NavBtn icon={Setting} onClick={handleClickBtn} />
      </BtnContainer>
    </HeaderContainer>
  );
}

export default Header;
