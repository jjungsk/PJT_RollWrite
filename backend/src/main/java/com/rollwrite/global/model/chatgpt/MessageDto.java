package com.rollwrite.global.model.chatgpt;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MessageDto {
    private String role;
    private String content;
}