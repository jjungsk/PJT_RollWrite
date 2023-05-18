package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingCalenderResDto {

    private final LocalDate day;
    private final String question;
    private final Long questionId;
    private final String answer;
    private final int answerCnt;
    private final int participantCnt;
    private final String imageUrl;
    private final int rate;

    @Builder
    public MeetingCalenderResDto(LocalDate day, String question, Long questionId, String answer, int answerCnt, String imageUrl, int participantCnt) {
        this.day = day;
        this.question = question;
        this.questionId = questionId;
        this.answer = answer;
        this.answerCnt = answerCnt;
        this.participantCnt = participantCnt;
        this.imageUrl = imageUrl;
        this.rate = (int) ((answerCnt / (double) participantCnt) * 100);
    }

}
