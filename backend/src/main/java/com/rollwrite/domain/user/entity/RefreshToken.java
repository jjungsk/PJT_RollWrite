package com.rollwrite.domain.user.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

/**
 * Redis 에 저장되는 Refresh Token
 */
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    @Id // redis 의 key로 사용 됨
    private String identifier;
    private String refreshToken;

    @Builder
    public RefreshToken(String identifier, String refreshToken) {
        this.identifier = identifier;
        this.refreshToken = refreshToken;
    }

}
