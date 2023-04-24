package com.rollwrite.domain.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddQuestionResponseDto {
    private final int usage;
    private final int limit;

    @Builder
    public AddQuestionResponseDto(int usage, int limit) {
        this.usage = usage;
        this.limit = limit;
    }
}