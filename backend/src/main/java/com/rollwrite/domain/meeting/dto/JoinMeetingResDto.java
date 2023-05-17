package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class JoinMeetingResDto {
    private final int flag;
    private final Long meetingId;

    @Builder
    public JoinMeetingResDto(int flag, Long meetingId) {
        this.flag = flag;
        this.meetingId = meetingId;
    }
}
