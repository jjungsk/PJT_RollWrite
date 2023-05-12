package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingCalenderResDto {

    private final LocalDate day;
    private final String question;
    private final int answerCnt;
    private final int participantCnt;
    private final double rate;

    @Builder
    public MeetingCalenderResDto(LocalDate day, String question, int answerCnt, int participantCnt) {
        this.day = day;
        this.question = question;
        this.answerCnt = answerCnt;
        this.participantCnt = participantCnt;
        this.rate = (answerCnt / (double) participantCnt) * 100;
    }

}
