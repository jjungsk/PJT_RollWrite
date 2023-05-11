import { axiosFileInstance, axiosInstance } from "./instance";

// 카카오 로그인 리다이렉트
export const redirectKakao = () => {
  const CLIENT_ID = "88cb08e0de73021429ec359e909db650";
  const REDIRECT_URI = `${process.env.REACT_APP_SERVER_URL}/oauth`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
};

// 카카오 로그인
export const kakaoOuath = async (code: string) => {
  const response = await axiosInstance.get(`/auth/kakao/login?code=${code}`);
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

// 사용자 타입 가져오기
export const getUserType = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

// 사용자 정보 가져오기
export const getUserDetail = async () => {
  const response = await axiosInstance.get("/user/");
  return response.data;
};

// 사용자 정보 수정하기
export const updateUserDetail = async (formData: FormData) => {
  const response = await axiosFileInstance.put("/user", formData);
  return response.data;
};

// 사용자 프로필 사진 삭제하기
export const deleteUserProfileImg = async () => {
  const response = await axiosFileInstance.delete("/user/profile");
  return response.data;
};

// 사용자가 참여한 완료된 모임 목록 가져오기
export const getUserGroupIsDoneList = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/meeting/result?page=${page}&size=${size}`
  );
  return response.data;
};
