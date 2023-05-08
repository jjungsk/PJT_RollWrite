import { axiosInstance } from "./instance";

// 공지사항
export const getNoticeList = async () => {
  // TODO: URL 수정하기
  const response = await axiosInstance.get("TODO: URL");
  return response.data;
};
