import React, { useEffect } from "react";
import { ErrorPageContainer } from "./style";
import { useAppDispatch } from "../../constants/types";
import { updateRouteHistory } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/Atom/Btn/Btn";

function ErrorPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "잘못된 접근";
    dispatch(updateRouteHistory(""));
  }, [dispatch]);

  return (
    <ErrorPageContainer>
      <img src="./sad-pepe.gif" alt="sad pepe" />
      <p>잘못된 접근입니다 😥</p>
      <Btn label="홈으로 가기" onClick={() => navigate("")} />
    </ErrorPageContainer>
  );
}
export default ErrorPage;
