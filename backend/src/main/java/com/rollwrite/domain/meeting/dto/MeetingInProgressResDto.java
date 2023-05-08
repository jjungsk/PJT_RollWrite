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
    private final String inviteUrl;
    private final int participantCnt;
    private final List<TagDto> tag;
    private final List<ParticipantDto> participant;

    @Builder
    public MeetingInProgressResDto(Meeting meeting, int participantCnt, List<TagDto> tag, List<ParticipantDto> participant, String baseUrl) {
        this.meetingId = meeting.getId();
        this.title = meeting.getTitle();
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.inviteUrl = baseUrl + meeting.getInviteCode();
        this.participantCnt = participantCnt;
        this.tag = tag;
        this.participant = participant;
    }
}
