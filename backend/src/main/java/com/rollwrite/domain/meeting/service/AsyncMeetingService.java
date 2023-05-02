package com.rollwrite.domain.meeting.service;

import com.google.gson.Gson;
import com.rollwrite.domain.meeting.dto.AsyncChatGptDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.QuestionGpt;
import com.rollwrite.domain.question.repository.QuestionGptRepository;
import com.rollwrite.global.model.chatgpt.ChatGPTReqDto;
import com.rollwrite.global.model.chatgpt.ChatGPTResDto;
import com.rollwrite.global.model.chatgpt.MessageDto;
import com.rollwrite.global.service.OpenAIClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AsyncMeetingService {

    private final OpenAIClientService openAIClientService;
    private final QuestionGptRepository questionGptRepository;

    @Async
    public void saveGptQuestion(String tag, Meeting meeting, long period) {
        String query = "를 공통으로 이루어진 모임이 있어. 이 모임에서 서로 에게 물어볼 만한 20자 이내의 흥미로운 질문 " + period + "개와 그와 연관된 이모지도 같이 추천해줘, 형식은 json 배열이야, {\"question\":\"content\",\"emoji\": \"🍕\"}";
        List<MessageDto> messageDtoList = new ArrayList<>();
        MessageDto messageDto = MessageDto.builder()
                .role("user")
                .content(tag + query)
                .build();

        messageDtoList.add(messageDto);

        ChatGPTReqDto chatGPTReqDto = ChatGPTReqDto.builder()
                .model("gpt-3.5-turbo")
                .messages(messageDtoList)
                .build();

        ChatGPTResDto chatGPTResDto = openAIClientService.chat(chatGPTReqDto);
        log.info("질문 : " + tag + query);
        String response = chatGPTResDto.getChoices().get(0).getMessage().getContent();

        // 질문하고 이모지 파싱
        Gson gson = new Gson();

        // List<AsyncChatGptDto> 타입으로 파싱
        Type answerListType = new com.google.gson.reflect.TypeToken<List<AsyncChatGptDto>>() {}.getType();
        List<AsyncChatGptDto> answerList = gson.fromJson(response, answerListType);

        // 파싱된 객체 저장
        for (AsyncChatGptDto asyncChatGptDto : answerList) {
            log.info("질문 : " + asyncChatGptDto.getQuestion());
            log.info("이모지 : " + asyncChatGptDto.getEmoji().substring(0, 1));
            QuestionGpt questionGpt = QuestionGpt.builder()
                    .emoji(asyncChatGptDto.getEmoji().substring(0, 1))
                    .content(asyncChatGptDto.getQuestion())
                    .meeting(meeting)
                    .build();
            questionGptRepository.save(questionGpt);
        }
    }
}
