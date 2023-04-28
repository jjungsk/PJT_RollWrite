package com.rollwrite.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.ResponseCookie;

@Getter
@ToString
@Builder
public class AddTokenCookieDto {
    private final String accessToken;
    private final String refreshToken;
    private final ResponseCookie responseCookie;
}
