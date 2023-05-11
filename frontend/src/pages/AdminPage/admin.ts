import { axiosInstance } from "../../apis/instance";

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
