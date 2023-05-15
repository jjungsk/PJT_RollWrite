package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class MeetingRandomQuestionDto {

    private final Long meetingId;
    private final LocalDate findDay;

    @Builder
    public MeetingRandomQuestionDto(Long meetingId, LocalDate findDay) {
        this.meetingId = meetingId;
        this.findDay = findDay;
    }
}
