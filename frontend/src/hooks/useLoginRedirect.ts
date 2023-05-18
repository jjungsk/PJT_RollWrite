// hooks/useLoginRedirect.ts
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../constants/types";
import { updateRouteHistory } from "../store/authReducer";

const useLoginRedirect = (dispatch: ReturnType<typeof useAppDispatch>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    const currentPath = location.pathname;

    if (
      !isLogin &&
      currentPath !== "/login" &&
      currentPath !== "/oauth" &&
      currentPath !== "/manual"
    ) {
      navigate("/login");
      if (currentPath !== "/setting") {
        dispatch(updateRouteHistory(currentPath));
      }
    } else if (isLogin && currentPath === "/login") {
      navigate("/");
    }
  }, [isLogin, location, navigate, dispatch]);
};

export default useLoginRedirect;
