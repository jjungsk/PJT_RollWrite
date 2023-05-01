package com.rollwrite.domain.user.dto;

import lombok.*;

@Getter
@ToString
public class FindUserResDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;

    @Builder
    public FindUserResDto(Long userId, String nickname, String profileImage) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}
