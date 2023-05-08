package com.rollwrite.global.service;

import com.rollwrite.global.model.chatgpt.ChatGPTReqDto;
import com.rollwrite.global.model.chatgpt.ChatGPTResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAIClientService {
    private final OpenAIClient openAIClient;

    @Value("${openai-service.api-key}")
    private String accessToken;

    public ChatGPTResDto chat(ChatGPTReqDto chatGPTReqDto) {
        ChatGPTResDto chatGPTResDto = openAIClient.chat("Bearer " + accessToken, chatGPTReqDto);
        return chatGPTResDto;
    }
}