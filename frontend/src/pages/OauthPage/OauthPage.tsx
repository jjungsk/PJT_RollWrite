import React from "react";
import { kakaoOuath } from "../../apis/home";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  updateAccessToken,
  updateRouteHistory,
  updateLoginStatus,
} from "../../store/authReducer";
import { useAppDispatch, useAppSelector } from "../../constants/types";
function Oauth() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const code = searchParams?.get("code");
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  console.log("Oauth:" + routeHistory);
  code &&
    kakaoOuath(code)
      .then((res) => {
        dispatch(updateLoginStatus(true));
        dispatch(updateAccessToken(res.data.accessToken));
      })
      .catch((err) => {
        console.log(err);
      });
  return <div>Oauth</div>;
}

export default Oauth;
