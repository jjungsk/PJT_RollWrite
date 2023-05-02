package com.rollwrite.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
public class DetailsUserResDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;
    private final int cntMeetingIs;
    private final int cntMeetingIsDone;

    @Builder
    public DetailsUserResDto(Long userId, String nickname, String profileImage,
                             int cntMeetingIs, int cntMeetingIsDone) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.cntMeetingIs = cntMeetingIs;
        this.cntMeetingIsDone = cntMeetingIsDone;
    }
}
