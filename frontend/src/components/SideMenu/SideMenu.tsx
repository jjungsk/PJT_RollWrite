import React from "react";
import { SideMenuBackground, SideMenuContainer } from "./style";
import { HeaderContainer } from "../Header/style";
import { ReactComponent as CloseArrow } from "../../assets/Close_Arrow.svg";

function SideMenu(props: {
  handleSideMenuOpen: (sideMenuOpen: boolean) => void;
}) {
  const handleClickCloseBtn = () => {
    props.handleSideMenuOpen(false);
  };

  return (
    <SideMenuBackground>
      <SideMenuContainer>
        <HeaderContainer padding={"0px 16px"}>
          <CloseArrow onClick={handleClickCloseBtn} />
        </HeaderContainer>
        SideMenu
      </SideMenuContainer>
      ;
    </SideMenuBackground>
  );
}

export default SideMenu;
