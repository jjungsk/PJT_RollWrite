package com.rollwrite.domain.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddQuestionResDto {
    private final int usage;
    private final int limit;

    @Builder
    public AddQuestionResDto(int usage, int limit) {
        this.usage = usage;
        this.limit = limit;
    }
}