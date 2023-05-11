import { axiosInstance } from "../../apis/instance";
import { Notice } from "./type";

export const getUser = async (userType: string) => {
  const response = await axiosInstance.get(`/admin/user/${userType}`);
  return response.data;
};

export const getTagList = async () => {
  const response = await axiosInstance.get(`/admin/tag`);
  return response.data;
};

export const getMeetingList = async () => {
  const response = await axiosInstance.get(`/admin/meeting`);
  return response.data;
};

export const getInquiryList = async () => {
  const response = await axiosInstance.get(`/admin/inquiry`);
  return response.data;
};

export const addTag = async (content: string) => {
  const response = await axiosInstance.post(`/admin/tag`, { content: content });
  return response.data;
};

export const changeTag = async (content: string, tagId: number) => {
  const response = await axiosInstance.put(`/admin/tag/${tagId}`, {
    content: content,
  });
  return response.data;
};

export const changeUserType = async (userId: number) => {
  const response = await axiosInstance.put(`/admin/type/${userId}`);
  return response.data;
};

export const createTodayQuestion = async (meetingId: number) => {
  const response = await axiosInstance.post(`/admin/question/${meetingId}`);
  return response.data;
};

export const createNoitce = async (notice: Notice) => {
  const response = await axiosInstance.post(`/admin/notice`, notice);
  return response.data;
};

export const getNoitceList = async () => {
  const response = await axiosInstance.get(`/admin/notice`);
  return response.data;
};

export const deleteNoitce = async (noticeId: number) => {
  const response = await axiosInstance.delete(`/admin/notice/${noticeId}`);
  return response.data;
};

export const UpdateNoitce = async (notice: Notice) => {
  const response = await axiosInstance.put(
    `/admin/notice/${notice.noticeId}`,
    notice
  );
  return response.data;
};
