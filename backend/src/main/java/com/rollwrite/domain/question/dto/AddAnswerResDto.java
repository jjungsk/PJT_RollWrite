package com.rollwrite.domain.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddAnswerResDto {
    private final Long meetingId;
    private final boolean isDone;

    @Builder
    public AddAnswerResDto(Long meetingId, boolean isDone) {
        this.meetingId = meetingId;
        this.isDone = isDone;
    }
}