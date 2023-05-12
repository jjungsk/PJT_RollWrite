import React from "react";
import { LoadingIconContainer, LoadingIconWrap, LoadingText } from "./style";

function LoadingIcon() {
  return (
    <>
      <LoadingIconWrap>
        <LoadingIconContainer>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </LoadingIconContainer>
      </LoadingIconWrap>
      <LoadingText>권한을 확인하고 있습니다...</LoadingText>
    </>
  );
}

export default LoadingIcon;
