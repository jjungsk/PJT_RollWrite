package com.rollwrite.domain.question.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class AddQuestionRequestDto {
    private final Long meetingId;
    private final String question;
}