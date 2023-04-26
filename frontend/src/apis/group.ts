import { axiosInstance } from "./instance";
import { CreateGroup } from "../constants/types";

export const createGroup = async (groupInfo: CreateGroup) => {
  const response = await axiosInstance.post("/meeting", groupInfo);
  return response.data;
};
export const getGroupList = async () => {
  const response = await axiosInstance.get("/meeting");
  return response.data;
};
export const getQuestionList = async (id: number) => {
  const response = await axiosInstance.get(`/meeting/${id}`);
  return response.data;
};
