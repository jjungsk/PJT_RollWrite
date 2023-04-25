package com.rollwrite.domain.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FindTodayQuestionResDto {
    private final Long meetingId;
    private final String title;
    private final int day;
    private final Long questionId;
    private final String question;
    private final String emoji;
    private final String answer;
    private final String image;

    @Builder
    public FindTodayQuestionResDto(Long meetingId, String title, int day, Long questionId, String question, String emoji, String answer, String image) {
        this.meetingId = meetingId;
        this.title = title;
        this.day = day;
        this.questionId = questionId;
        this.question = question;
        this.emoji = emoji;
        this.answer = answer;
        this.image = image;
    }
}