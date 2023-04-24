import React, { useEffect, useState } from "react";
import { FooterContainer } from "./style";
import { ReactComponent as Comment } from "../../assets/Comment.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { ReactComponent as User } from "../../assets/User.svg";
import NavBtn from "../../elements/Button/NavBtn";
import { useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const BTN_LIST = [
    { icon: Home, label: "홈", path: "/home" },
    { icon: Comment, label: "질문", path: "/question" },
    { icon: User, label: "마이페이지", path: "/my" },
  ];
  const [nowBtn, setNowBtn] = useState<number>();

  useEffect(() => {
    BTN_LIST.map((btn, i) =>
      btn.path === location.pathname ? setNowBtn(i) : null
    );
  }, [location]);

  const handleClickBtn = (i: number) => {
    setNowBtn(i);
    navigate(BTN_LIST[i].path);
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
