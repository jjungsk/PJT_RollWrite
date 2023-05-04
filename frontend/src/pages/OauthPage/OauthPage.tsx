import React, { useEffect } from "react";
import { kakaoOuath } from "../../apis/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateAccessToken, updateLoginStatus } from "../../store/authReducer";
import { useAppDispatch, useAppSelector } from "../../constants/types";
import { toast } from "react-hot-toast";

function Oauth() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const code = searchParams?.get("code");
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);

  useEffect(() => {
    if (code) {
      kakaoOuath(code)
        .then((res) => {
          dispatch(updateLoginStatus(true));
          dispatch(updateAccessToken(res.data.accessToken));
          navigate(routeHistory || "/question"); // 실패할 경우 기본 경로로 이동
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [code, dispatch, navigate, routeHistory]);

  return <div></div>;
}

export default Oauth;
