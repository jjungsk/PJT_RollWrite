package com.rollwrite.domain.meeting.service;

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

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AsyncMeetingService {

    private final OpenAIClientService openAIClientService;
    private final QuestionGptRepository questionGptRepository;

    @Async
    public void saveGptQuestion(String tag, Meeting meeting) {
        String query = "를 공통으로 이루어진 모임이 있어. 이 모임에서 서로 에게 물어볼 만한 20자 이내의 흥미로운 질문과 연관된 이모지를 10개 말해줘, 형식 예시는 '1. 미래의 직업은? 이모지'니까 꼭 지켜줘";
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

        String[] questionArray = response.split("\n");
        for (String question : questionArray) {
            log.info("대답 : " + question);
            String pattern = "^\\d+\\.\\s+(.+?)\\s*(\\p{So})?$";

            Pattern r = Pattern.compile(pattern);
            Matcher m = r.matcher(question);
            if (m.find()) {
                String content = m.group(1); // "내가 가장 좋아하는 취미는?"
                String emoji = "";

                if (m.group(2) != null) {
                    if (m.group(2).length() == 1) {
                        emoji = m.group(2);
                    } else {
                        emoji = m.group(2).substring(0, 2); // "🎨"
                    }
                } else {
                    // 이모지 종류가 다양해 파싱 안되는 문제 -> 직접 추가 파싱
                    String[] list = content.split("\\? ");
                    content = list[0] + "?";
                    emoji = list[1];
                }

                QuestionGpt questionGpt = QuestionGpt.builder()
                        .emoji(emoji)
                        .content(content)
                        .meeting(meeting)
                        .build();
                questionGptRepository.save(questionGpt);
            }
        }
    }
}
