package com.rollwrite.domain.question.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddQuestionRequestDto {
    private Long meetingId;
    private String question;
}