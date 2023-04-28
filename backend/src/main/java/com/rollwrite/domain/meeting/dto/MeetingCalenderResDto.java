package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingCalenderResDto {

    private final LocalDate day;
    private final String question;

    @Builder
    public MeetingCalenderResDto(LocalDateTime day, String question) {
        this.day = day.toLocalDate();
        this.question = question;
    }
}
