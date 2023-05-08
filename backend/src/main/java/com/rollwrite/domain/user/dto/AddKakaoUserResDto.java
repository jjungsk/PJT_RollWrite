package com.rollwrite.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddKakaoUserResDto {

    private final String id;
    private final String nickname;
    private final String profileImage;

    @Builder
    public AddKakaoUserResDto(String id, String nickname, String profileImage) {
        this.id = id;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

}
