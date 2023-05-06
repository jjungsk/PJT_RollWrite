package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

/**
 * FCM Alarm 유저
 * 현재 진행 중인 모임의 유저들에게 8시 질문 알람이 오도록
 */

@Getter
@ToString
public class MeetingFindUserDto {
    private final Long userId;
    private final Long meetingId;
    private final String title;

    @Builder
    public MeetingFindUserDto(Long userId, Long meetingId, String title) {
        this.userId = userId;
        this.meetingId = meetingId;
        this.title = title;
    }
}
