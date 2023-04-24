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
    ADD_MEETING_SUCCESS(StatusCode.SUCCESS, "모임이 생성되었습니다."),

    // question
    ADD_QUESTION_SUCCESS(StatusCode.SUCCESS, "질문이 생성되었습니다."),
    ADD_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 생성되었습니다."),
    MODIFY_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 수정되었습니다."),
    FIND_TODAY_QUESTION_SUCCESS(StatusCode.SUCCESS, "오늘 질문 목록을 조회했습니다."),
    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getHttpStatusCode();
    }
}