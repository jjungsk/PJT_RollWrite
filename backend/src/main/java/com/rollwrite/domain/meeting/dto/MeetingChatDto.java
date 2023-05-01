package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Meeting;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class MeetingChatDto {
    private final Long meetingId;
    private final String title;
    private final LocalDate startDay;
    private final LocalDate endDay;
    private final String color;
    private final int participantCnt;
    private final List<TagDto> tag;
    private final List<ChatDto> chat;

    @Builder
    public MeetingChatDto(Meeting meeting, int participantCnt, List<TagDto> tag, List<ChatDto> chat) {
        this.meetingId = meeting.getId();
        this.title = meeting.getTitle();
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.participantCnt = participantCnt;
        this.tag = tag;
        this.chat = chat;
    }
}