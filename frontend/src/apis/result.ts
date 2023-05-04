import { axiosInstance } from "./instance";

// 사용자가 참여한 완료된 모임 목록 가져오기
export const getUserGroupIsDoneList = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/meeting/result?page=${page}&size=${size}`
  );
  return response.data;
};

// 완료된 모임 결과 채팅 조회하기
export const getGroupIsDoneResultChat = async (meetingId: number) => {
  const response = await axiosInstance.get(`/meeting/chat/${meetingId}`);
  return response.data;
};

// 완료된 모임 결과 통계 조회하기
export const getGroupIsDoneResultAward = async (meetingId: number) => {
  const response = await axiosInstance.get(`/meeting/award/${meetingId}`);
  return response.data;
};

// 완료된 모임 결과 질문 목록 조회하기
export const getGroupIsDoneResultQuestionList = async (meetingId: number) => {
  const response = await axiosInstance.get(`/question/${meetingId}`);
  return response.data;
};

// 완료된 모임 결과 참여자 목록 조회하기
export const getGroupIsDoneResultParticipantList = async (
  meetingId: number
) => {
  const response = await axiosInstance.get(`/meeting/participant/${meetingId}`);
  return response.data;
};
