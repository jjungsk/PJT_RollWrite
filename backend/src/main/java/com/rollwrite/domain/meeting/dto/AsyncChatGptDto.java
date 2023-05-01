package com.rollwrite.domain.meeting.dto;

import lombok.Getter;

@Getter
public class AsyncChatGptDto {
    private final String question;
    private final String emoji;

    public AsyncChatGptDto(String question, String emoji) {
        this.question = question;
        this.emoji = emoji;
    }
}
