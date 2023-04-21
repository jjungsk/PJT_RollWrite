import React, { useState } from "react";
import { FooterContainer } from "./style";
import { ReactComponent as Comment } from "../../assets/Comment.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { ReactComponent as User } from "../../assets/User.svg";
import NavBtn from "../../elements/Button/NavBtn";

function Footer() {
  const BTN_LIST = [
    { icon: Home, label: "홈" },
    { icon: Comment, label: "질문" },
    { icon: User, label: "마이페이지" },
  ];
  const [nowBtn, setNowBtn] = useState<number>(1);

  const handleClickBtn = (i: number) => {
    setNowBtn(i);
  };
  return (
    <FooterContainer>
      {BTN_LIST.map((btn, i) => (
        <NavBtn
          key={i}
          isClicked={i === nowBtn}
          icon={btn.icon}
          label={btn.label}
          onClick={() => handleClickBtn(i)}
        />
      ))}
    </FooterContainer>
  );
}

export default Footer;
