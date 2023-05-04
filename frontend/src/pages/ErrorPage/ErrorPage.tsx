import React, { useEffect } from "react";
import { ErrorPageContainer } from "./style";
import { useAppDispatch } from "../../constants/types";
import { updateRouteHistory } from "../../store/authReducer";
function ErrorPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "잘못된 접근";
    dispatch(updateRouteHistory(""));
  }, [dispatch]);
  return (
    <ErrorPageContainer>
      <img src="./sad-pepe.gif" alt="sad pepe" />
      <p>잘못된 접근입니다 😥</p>
    </ErrorPageContainer>
  );
}
export default ErrorPage;
