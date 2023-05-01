package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.AwardType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AwardUserDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;
    private final AwardType awardType;

    @Builder
    public AwardUserDto(Long userId, String nickname, String profileImage, AwardType awardType) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.awardType = awardType;
    }
}
