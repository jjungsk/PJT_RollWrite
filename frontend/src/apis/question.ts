import { axiosFileInstance, axiosInstance } from "./instance";

// 오늘 질문 목록 가져오기
export const getQuestionList = async () => {
  const response = await axiosInstance.get("/question");
  return response.data;
};

// 특정 모임 질문목록 가져오기
export const getGroupQuestion = async (id: number) => {
  const response = await axiosInstance.get(`/question/${id}`);
  return response.data;
};

// 답변하기
export const createAnswer = async (FormData: FormData) => {
  const response = await axiosFileInstance.post("/question/answer", FormData);
  return response.data;
};

// 답변수정하기
export const updateAnswer = async (FormData: FormData) => {
  const response = await axiosFileInstance.put(`/question/answer`, FormData);
  return response.data;
};

// 이미지 지우기
export const deleteAnswerImg = async (questionId: number) => {
  const response = await axiosInstance.delete(`/question/answer/${questionId}`);
  return response.data;
};
