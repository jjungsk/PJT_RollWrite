import { axiosInstance } from "./instance";

export const getQuestionList = async () => {
    const response = await axiosInstance.get("/question");
    return response.data;
  };