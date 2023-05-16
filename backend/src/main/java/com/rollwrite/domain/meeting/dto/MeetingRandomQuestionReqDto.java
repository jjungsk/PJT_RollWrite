package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class MeetingRandomQuestionReqDto {

    private final Long meetingId;
    private final LocalDate findDay;

    @Builder
    public MeetingRandomQuestionReqDto(Long meetingId, LocalDate findDay) {
        this.meetingId = meetingId;
        this.findDay = findDay;
    }
}
