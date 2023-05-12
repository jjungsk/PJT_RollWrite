package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.AwardType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingAwardDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;
    private final AwardType type;

    @Builder
    public MeetingAwardDto(Long userId, String nickname, String profileImage, AwardType type) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.type = type;
    }
}
