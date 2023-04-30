import React, { useState } from "react";
import { SideMenuBackground, SideMenuContainer } from "./style";
import { HeaderContainer } from "../Header/style";
import { ReactComponent as CloseArrow } from "../../assets/Close_Arrow.svg";
import AccordionList from "../../elements/AccordionList/AccordionList";

function SideMenu(props: {
  sideMenuOpen: boolean;
  handleSideMenuOpen: (sideMenuOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(props.sideMenuOpen);
  const menuItems = [
    {
      title: "질문 목록",
      content: (
        <div>
          이건 내용이야 이건 내용이야 이건 내용이야 이건 내용이야 이건 내용이야
          이건 내용이야 이건 내용이야 이건 내용이야
        </div>
      ),
    },
    {
      title: "모임 구성원",
      content: (
        <div>
          내용 블라블라 내용 블라블라 내용 블라블라 내용 블라블라 내용 블라블라
          내용 블라블라 내용 블라블라 내용 블라블라 내용 블라블라 내용 블라블라
        </div>
      ),
    },
    {
      title: "마지막!!!!",
      content: (
        <div>
          블라블라 수근수근 블라블라 수근수근 블라블라 수근수근 블라블라
          수근수근 블라블라 수근수근,
        </div>
      ),
    },
  ];

  const handleClickCloseBtn = () => {
    setIsOpen(false);
    setTimeout(() => {
      props.handleSideMenuOpen(false);
    }, 300);
  };

  return (
    <SideMenuBackground isOpen={isOpen}>
      <SideMenuContainer isOpen={isOpen}>
        <HeaderContainer padding={"0px 16px"}>
          <CloseArrow onClick={handleClickCloseBtn} />
        </HeaderContainer>
        <AccordionList items={menuItems} />
      </SideMenuContainer>
    </SideMenuBackground>
  );
}

export default SideMenu;
