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
    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getHttpStatusCode();
    }
}