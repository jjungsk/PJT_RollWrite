import React from "react";
import { LoadingIconSmallContainer, LoadingIconSmallWrap } from "./style";

function LoadingIconSmall() {
  return (
    <LoadingIconSmallWrap>
      <LoadingIconSmallContainer>
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
      </LoadingIconSmallContainer>
    </LoadingIconSmallWrap>
  );
}

export default LoadingIconSmall;
