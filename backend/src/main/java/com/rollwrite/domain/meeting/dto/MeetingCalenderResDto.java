package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingCalenderResDto {

    private final LocalDate day;
    private final String question;
    private final String answer;
    private final int answerCnt;
    private final int participantCnt;
    private final double rate;

    @Builder
    public MeetingCalenderResDto(LocalDate day, String question, String answer, int answerCnt, int participantCnt) {
        this.day = day;
        this.question = question;
        this.answer = answer;
        this.answerCnt = answerCnt;
        this.participantCnt = participantCnt;
        this.rate = (answerCnt / (double) participantCnt) * 100;
    }

}
