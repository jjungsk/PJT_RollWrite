import React, { useEffect } from "react";
import { ErrorPageContainer } from "./style";

function ErrorPage() {
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "잘못된 접근";
  }, []);

  return (
    <ErrorPageContainer>
      <img src="./sad-pepe.gif" alt="sad pepe" />
      <p>잘못된 접근입니다 😅</p>
    </ErrorPageContainer>
  );
}

export default ErrorPage;
