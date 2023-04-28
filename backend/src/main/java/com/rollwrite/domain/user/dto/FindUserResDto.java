package com.rollwrite.domain.user.dto;

import lombok.*;

@Getter
@ToString
public class FindUserResDto {
    private final String nickname;
    private final String profileImage;

    @Builder

    public FindUserResDto(String nickname, String profileImage) {
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}
