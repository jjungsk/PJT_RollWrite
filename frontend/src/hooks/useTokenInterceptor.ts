import { useAppDispatch } from "../constants/types";
import { updateAccessToken } from "../store/authReducer";
import { axiosFileInstance, axiosInstance } from "../apis/instance";
import { persistor } from "../store/store";
import { toast } from "react-hot-toast";
import { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";

export default function useTokenInterceptor(
  dispatch: ReturnType<typeof useAppDispatch>
) {
  const purge = async () => {
    await persistor.purge();
  };
  const navigate = useNavigate();
  const updateToken = async (instance: AxiosInstance, error: any) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.data.statusCode === 401) {
      try {
        // 갱신 요청
        axiosInstance.defaults.headers.common["Authorization"] = null;
        const res = await axiosInstance.post<any>(`auth/reissue`);
        const newAccessToken = res.data.data.accessToken;
        dispatch(updateAccessToken(newAccessToken));
        // 실패했던 요청 새로운 accessToken으로 헤더 변경하고 재요청
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        // 갱신 실패시 임의 로그아웃 처리
        purge();
      }
    } else if (response.status === 403) {
      toast.error("접근 권한이 없습니다.");
      navigate("/");
    }
    return Promise.reject(error);
  };

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      updateToken(axiosInstance, error);
    }
  );
  axiosFileInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      updateToken(axiosFileInstance, error);
    }
  );
}
