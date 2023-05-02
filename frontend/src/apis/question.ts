import { axiosInstance } from "./instance";

// 오늘 질문 목록 가져오기
export const getQuestionList = async () => {
    const response = await axiosInstance.get("/question");
    return response.data;
  };


// 특정 모임 질문/답변 가져오기
export const getGroupQuestion = async (id: number) => {
  const response = await axiosInstance.get(`/question/${id}`);
  return response.data;
};

// 답변하기
export const createAnswer = async (answer: string, meetingId: number, questionId: number, image?: string) => {
  const response = await axiosInstance.post("/question/answer", {
    answer: answer,
    meetingId: meetingId,
    questionId: questionId,
    image: image
  });
  return response.data;
};

// 답변수정하기
export const updateAnswer = async (answer: string, questionId: number, image?: string) => {
  const response = await axiosInstance.patch(`/question/answer`, {
    answer: answer,
    questionId: questionId,
    image: image
  });
  return response.data;
};