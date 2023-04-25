package com.rollwrite.domain.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class FindQuestionResDto {
    private final LocalDate day;
    private final Long questionId;
    private final String question;

    @Builder
    public FindQuestionResDto(LocalDate day, Long questionId, String question) {
        this.day = day;
        this.questionId = questionId;
        this.question = question;
    }
}