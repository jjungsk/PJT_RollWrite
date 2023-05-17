package com.rollwrite.domain.admin.dto;

import com.rollwrite.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FindUserResDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;
    private final Long point;
    private final String userType;

    @Builder
    public FindUserResDto(User user) {
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();
        this.point = user.getPoint();
        this.userType = user.getType().name();
    }
}
