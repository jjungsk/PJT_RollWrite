package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class MeetingRandomQuestionResDto {

    private String answer;

    @Builder
    public MeetingRandomQuestionResDto(String answer) {
        this.answer = answer;
    }
}
