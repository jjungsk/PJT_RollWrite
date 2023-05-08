import React from "react";
import { LogoContainer, BtnContainer } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as KakaoBtn } from "../../assets/Kakao.svg";

import { redirectKakao } from "../../apis/user";
import { useAppDispatch } from "../../constants/types";
import { updateAccessToken, updateLoginStatus } from "../../store/authReducer";

function LoginPage() {
  const dispatch = useAppDispatch();

  const handleClickLoginBtn = () => {
    dispatch(updateAccessToken(""));
    dispatch(updateLoginStatus(false));
    redirectKakao();
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
