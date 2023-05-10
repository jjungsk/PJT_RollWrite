import { axiosInstance } from "../../apis/instance";

export const getUser = async (type: string) => {
  const response = await axiosInstance.get(`/admin/user/${type}`);
  return response.data;
};
