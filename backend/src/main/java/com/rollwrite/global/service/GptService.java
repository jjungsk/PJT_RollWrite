package com.rollwrite.global.service;

import com.rollwrite.global.model.chatgpt.ChatGPTReqDto;
import com.rollwrite.global.model.chatgpt.ChatGPTResDto;
import com.rollwrite.global.model.chatgpt.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GptService {

    private final OpenAIClientService openAIClientService;

    public ChatGPTResDto chatGpt(String content) {
        List<MessageDto> messageDtoList = new ArrayList<>();
        MessageDto messageDto = MessageDto.builder()
                .role("user")
                .content(content)
                .build();

        messageDtoList.add(messageDto);

        ChatGPTReqDto chatGPTReqDto = ChatGPTReqDto.builder()
                .model("gpt-3.5-turbo")
                .messages(messageDtoList)
                .build();

        return openAIClientService.chat(chatGPTReqDto);
    }

}