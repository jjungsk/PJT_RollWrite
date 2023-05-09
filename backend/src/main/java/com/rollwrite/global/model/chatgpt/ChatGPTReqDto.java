package com.rollwrite.global.model.chatgpt;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ChatGPTReqDto {
    private String model;
    private List<MessageDto> messages;
}
