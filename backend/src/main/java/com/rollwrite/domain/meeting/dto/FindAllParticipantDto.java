package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * FCM Alarm 유저
 * 현재 진행 중인 모임의 유저들에게 8시 질문 알람이 오도록
 */

@Getter
@Setter
@ToString
public class FindAllParticipantDto {
    private Long userId;
    private String firebaseToken;
    private Long meetingId;
    private String title;
    private User user;
    private Meeting meeting;

    @Builder
    public FindAllParticipantDto(Long userId, String firebaseToken, Long meetingId, String title, User user, Meeting meeting) {
        this.userId = userId;
        this.firebaseToken = firebaseToken;
        this.meetingId = meetingId;
        this.title = title;
        this.user = user;
        this.meeting = meeting;
    }
}
