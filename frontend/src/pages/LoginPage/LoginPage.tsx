import React from "react";
import { LogoContainer, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as KakaoBtn } from "../../assets/Kakao.svg";
import { updateLoginStatus, updateRouteHistory } from "../../store/authReducer";
import { useAppDispatch, useAppSelector } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import { redirectKakao } from "../../apis/home";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  dispatch(updateLoginStatus(false));
  const handleClickLoginBtn = () => {
    // TODO: 카카오 로그인 구현
    redirectKakao();
    // dispatch(updateLoginStatus(true));
    // navigate(routeHistory);
    // dispatch(updateRouteHistory(""));
  };

  return (
    <>
      <LogoContainer>
        <Logo />
        <p>
          친구들과 특별한 추억을 <br /> 만들어 볼까요?
        </p>
      </LogoContainer>
      <BtnContainer>
        <KakaoBtn onClick={handleClickLoginBtn} />
      </BtnContainer>
    </>
  );
}

export default LoginPage;
