import React from "react";
import { Wrapper, TextDiv, BtnDiv } from "./style";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as KakaoBtn } from "../../assets/Kakao.svg";

function LoginPage() {
  return (
    <Wrapper>
      <div style={{ marginTop: "150px" }}>
        <Logo style={{ width: 310, height: 146 }} />
      </div>
      <TextDiv>
        친구들과 특별한 추억을 <br /> 만들어 볼까요?
      </TextDiv>
      <BtnDiv>
        <KakaoBtn style={{ width: 240, height: 60 }} />
      </BtnDiv>
    </Wrapper>
  );
}

export default LoginPage;
