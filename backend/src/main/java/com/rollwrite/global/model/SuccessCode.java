package com.rollwrite.global.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SuccessCode {

    // user
    SIGNUP_SUCCESS(StatusCode.SUCCESS, "회원가입 완료되었습니다."),
    LOGIN_SUCCESS(StatusCode.SUCCESS, "로그인 완료되었습니다."),
    REISSUE_SUCCESS(StatusCode.SUCCESS, "accessToken 재발급이 완료되었습니다."),
    FIND_USER_SUCCESS(StatusCode.SUCCESS, "유저 조회가 완료되었습니다."),
    LOGOUT_SUCCESS(StatusCode.SUCCESS, "로그아웃 되었습니다."),

    // meeting
    ADD_MEETING_SUCCESS(StatusCode.SUCCESS, "모임이 생성되었습니다."),

    // question
    ADD_QUESTION_SUCCESS(StatusCode.SUCCESS, "질문이 생성되었습니다."),
    ADD_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 생성되었습니다."),
    MODIFY_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 수정되었습니다."),
    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getHttpStatusCode();
    }
}