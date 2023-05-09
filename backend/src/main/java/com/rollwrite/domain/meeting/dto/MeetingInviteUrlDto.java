package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingInviteUrlDto {
    Long meetingId;
    String inviteUrl;

    @Builder
    public MeetingInviteUrlDto(Long meetingId, String inviteUrl) {
        this.meetingId = meetingId;
        this.inviteUrl = inviteUrl;
    }
}
