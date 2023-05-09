import { axiosInstance } from "./instance";

// Firebase 토큰 전달
export const sendFirebaseToken = async (firebaseToken: string) => {
  const response = await axiosInstance.put("/notification/token", {
    firebaseToken: firebaseToken,
  });
  return response.data;
};

// 공지사항 목록 가져오기
export const getNoticeList = async () => {
  const response = await axiosInstance.get("/admin/notice");
  return response.data;
};
