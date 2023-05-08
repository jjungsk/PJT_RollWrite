package com.rollwrite.global.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    // 400 Bad Request
    VALIDATION_EXCEPTION(StatusCode.BAD_REQUEST, "잘못된 요청입니다"),
    NOT_FOUND_EXCEPTION(StatusCode.NOT_FOUND, "존재하지 않는 자원입니다"),

    // 401 UNAUTHORIZED
    UNAUTHORIZED_EXCEPTION(StatusCode.UNAUTHORIZED, "권한이 없는 유저입니다."),

    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getHttpStatusCode();
    }
}
