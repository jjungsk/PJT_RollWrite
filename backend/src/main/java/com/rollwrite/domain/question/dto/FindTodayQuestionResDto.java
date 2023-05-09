package com.rollwrite.domain.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

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
    private final LocalDateTime questionCreatedAt;
    private Boolean isFinal;

    public void updateIsFinal(Boolean isFinal) {
        this.isFinal = isFinal;
    }

    @Builder
    public FindTodayQuestionResDto(Long meetingId, String title, int day, Long questionId, String question, String emoji, String answer, String image, LocalDateTime questionCreatedAt) {
        this.meetingId = meetingId;
        this.title = title;
        this.day = day;
        this.questionId = questionId;
        this.question = question;
        this.emoji = emoji;
        this.answer = answer;
        this.image = image;
        this.questionCreatedAt = questionCreatedAt;
        this.isFinal = false;
    }
}