import { axiosInstance } from "./instance";

// 카카오 로그인 리다이렉트
export const redirectKakao = () => {
  const CLIENT_ID = "88cb08e0de73021429ec359e909db650";
  const REDIRECT_URI = "https://k8a508.p.ssafy.io/oauth";
  // const REDIRECT_URI = `https://k8a508.p.ssafy.io/api/auth/kakao/login`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
};

// 카카오 로그인
export const kakaoOuath = async (code: string) => {
  const response = await axiosInstance.get(`auth/kakao/login?code=${code}`);
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await axiosInstance.post("/auth/kakao/logout");
  return response.data;
};

// 회원탈퇴
export const withdraw = async () => {
  const response = await axiosInstance.delete("/user");
  return response.data;
};

// 사용자 정보 가져오기
export const getUserDetail = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};
