import React from "react";
import { kakaoOuath } from "../../apis/home";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateAccessToken, updateRouteHistory } from "../../store/authReducer";
import { useAppDispatch, useAppSelector } from "../../constants/types";
function Oauth() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const code = searchParams?.get("code");
  const routeHistory = useAppSelector((state) => state.auth.routeHistory);
  console.log(code);
  code &&
    kakaoOuath(code)
      .then((res) => {
        console.log(res);

        dispatch(updateAccessToken(res.data.accessToken));
        navigate(routeHistory);
        dispatch(updateRouteHistory(""));
      })
      .catch((err) => {
        console.log(err);
      });
  return <div>Oauth</div>;
}

export default Oauth;
