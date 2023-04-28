package com.rollwrite.global.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SuccessCode {

    // user
    TEST(StatusCode.SUCCESS, "테스트 입니다."),
    SIGNUP_SUCCESS(StatusCode.SUCCESS, "회원가입 완료되었습니다."),
    LOGIN_SUCCESS(StatusCode.SUCCESS, "로그인 완료되었습니다."),

    // meeting
    GET_MEETING_IN_PROGRESS_SUCCESS(StatusCode.SUCCESS, "진행 중인 전체 모임 조회했습니다."),
    GET_MEETING_CALENDER_SUCCESS(StatusCode.SUCCESS, "진행 중인 모임 캘린더 조회했습니다."),
    GET_MEETING_INVITE_URL_SUCCESS(StatusCode.SUCCESS, "모임 초대 링크를 조회했습니다."),
    ADD_MEETING_SUCCESS(StatusCode.SUCCESS, "모임이 생성되었습니다."),
    JOIN_MEETING_SUCCESS(StatusCode.SUCCESS, "모임에 가입되었습니다."),
    GET_MEETING_RESULT_SUCCESS(StatusCode.SUCCESS, "전체 모임 결과 조회했습니다."),
    GET_MEETING_DETAIL_RESULT_SUCCESS(StatusCode.SUCCESS, "모임 상세 결과 조회했습니다."),
    GET_TAG_SUCCESS(StatusCode.SUCCESS, "태그를 가져왔습니다."),

    // question
    ADD_QUESTION_SUCCESS(StatusCode.SUCCESS, "질문이 생성되었습니다."),
    ADD_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 생성되었습니다."),
    MODIFY_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 수정되었습니다."),
    FIND_TODAY_QUESTION_SUCCESS(StatusCode.SUCCESS, "오늘 질문 목록을 조회했습니다."),
    FIND_QUESTION_SUCCESS(StatusCode.SUCCESS, "질문 목록을 조회했습니다."),
    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getHttpStatusCode();
    }
}