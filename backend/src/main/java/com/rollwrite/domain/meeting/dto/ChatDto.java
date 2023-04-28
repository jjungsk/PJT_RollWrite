package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.question.entity.Question;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class ChatDto {
    private Long questionId;
    private String question;
    private String emoji;
    private LocalDate day;
    List<AnswerDto> answer;

    @Builder
    public ChatDto(Question question, List<AnswerDto> answer) {
        this.questionId = question.getId();
        this.question = question.getContent();
        this.emoji = question.getEmoji();
        this.day = question.getCreatedAt().toLocalDate();
        this.answer = answer;
    }
}