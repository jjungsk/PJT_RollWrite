package com.rollwrite.global.service;

import com.rollwrite.global.model.chatgpt.ChatGPTReqDto;
import com.rollwrite.global.model.chatgpt.ChatGPTResDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "openAIClient", url = "${openai-service.urls.base-url}")
public interface OpenAIClient {

    @PostMapping(value = "${openai-service.urls.chat-url}", headers = {"Content-Type=application/json"})
    ChatGPTResDto chat(@RequestHeader("Authorization") String accessToken, @RequestBody ChatGPTReqDto chatGPTReqDto);

}