package com.rollwrite.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FindUserProfileResDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;
    private final int cntMeetingProgress;
    private final int cntMeetingProgressIsDone;

    @Builder
    public FindUserProfileResDto(Long userId, String nickname, String profileImage,
                                 int cntMeetingProgress, int cntMeetingProgressIsDone) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.cntMeetingProgress = cntMeetingProgress;
        this.cntMeetingProgressIsDone = cntMeetingProgressIsDone;
    }
}
