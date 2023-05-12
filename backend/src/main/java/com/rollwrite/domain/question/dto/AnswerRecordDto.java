package com.rollwrite.domain.question.dto;

import com.rollwrite.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AnswerRecordDto {
    private final User user;
    private final int answerRecord;

    @Builder
    public AnswerRecordDto(User user, int answerRecord) {
        this.user = user;
        this.answerRecord = answerRecord;
    }
}