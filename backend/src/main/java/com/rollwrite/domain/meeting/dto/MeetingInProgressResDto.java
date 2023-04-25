package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Meeting;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingInProgressResDto {

    private final Long meetingId;
    private final String title;
    private final LocalDate startDay;
    private final LocalDate endDay;
    private final String color;
    private final String inviteCode;
    private final int participantCnt;
    private final int questionUsage;
    private final int questionLimit;
    private final List<TagDto> tag;
    private final List<ParticipantDto> participant;

    @Builder
    public MeetingInProgressResDto(Meeting meeting, int participantCnt, int questionUsage,
        int questionLimit, List<TagDto> tag, List<ParticipantDto> participant) {
        String inviteUrl = "http://localhost:8081/api/auth/join=";
        this.meetingId = meeting.getId();
        this.title = meeting.getTitle();
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.inviteCode = inviteUrl + meeting.getInviteCode();
        this.participantCnt = participantCnt;
        this.questionUsage = questionUsage;
        this.questionLimit = questionLimit;
        this.tag = tag;
        this.participant = participant;
    }
}
