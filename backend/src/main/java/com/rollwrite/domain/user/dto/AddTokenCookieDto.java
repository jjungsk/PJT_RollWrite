package com.rollwrite.domain.user.dto;

import lombok.*;
import org.springframework.http.ResponseCookie;

@Getter
@ToString
public class AddTokenCookieDto {
    private final String accessToken;
    private final String refreshToken;
    private final ResponseCookie responseCookie;

    @Builder
    public AddTokenCookieDto(String accessToken, String refreshToken, ResponseCookie responseCookie) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.responseCookie = responseCookie;
    }
}
