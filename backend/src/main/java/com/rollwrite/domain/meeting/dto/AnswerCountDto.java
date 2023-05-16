package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.question.entity.Question;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class AnswerCountDto {
    private final Question question;
    private final Long answerCount;
}
