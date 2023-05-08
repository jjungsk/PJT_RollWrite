package com.rollwrite.domain.question.dto;

import com.rollwrite.domain.question.entity.Question;
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
    public FindQuestionResDto(Question question) {
        this.day = question.getCreatedAt().toLocalDate();
        this.questionId = question.getId();
        this.question = question.getContent();
    }
}