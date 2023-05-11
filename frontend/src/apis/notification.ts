import { axiosFileInstance, axiosInstance } from "./instance";

// Firebase 토큰 전달
export const sendFirebaseToken = async (firebaseToken: string) => {
  const response = await axiosInstance.put("/notification/token", {
    firebaseToken: firebaseToken,
  });
  return response.data;
};

// 공지사항 목록 가져오기
export const getNoticeList = async () => {
  const response = await axiosInstance.get("/notice");
  return response.data;
};

// 의견 보내기
export const sendInquiry = async (formData: FormData) => {
  const response = await axiosFileInstance.post("/inquiry", formData);
  return response.data;
};

// 의견 보내기
export const sendInquiry = async (formData: FormData) => {
  const response = await axiosFileInstance.post("/inquiry", formData);
  return response.data;
};
