package com.rollwrite.domain.question.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddAnswerRequestDto {
    private Long meetingId;
    private Long questionId;
    private String answer;
}