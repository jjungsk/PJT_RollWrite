package com.rollwrite.domain.meeting.service;

import com.google.gson.Gson;
import com.rollwrite.domain.meeting.dto.AsyncChatGptDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.question.entity.QuestionGpt;
import com.rollwrite.domain.question.repository.QuestionGptRepository;
import com.rollwrite.domain.question.repository.QuestionRepository;
import com.rollwrite.global.model.chatgpt.ChatGPTReqDto;
import com.rollwrite.global.model.chatgpt.ChatGPTResDto;
import com.rollwrite.global.model.chatgpt.MessageDto;
import com.rollwrite.global.service.OpenAIClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AsyncMeetingService {

    private final QuestionRepository questionRepository;
    private final OpenAIClientService openAIClientService;
    private final QuestionGptRepository questionGptRepository;

    @Async
    public void saveGptQuestion(String tag, Meeting meeting, long period) {
        String query = "를 공통으로 이루어진 모임이 있어. 이 모임에서 서로 에게 물어볼 만한 20자 이내의 흥미로운 질문 " + period + "개와 그와 연관된 이모지도 딱 1개씩만 같이 추천해줘, 형식은 json 배열이야, {\"question\":\"content\",\"emoji\": \"🍕\"}";
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
        Type answerListType = new com.google.gson.reflect.TypeToken<List<AsyncChatGptDto>>() {
        }.getType();
        List<AsyncChatGptDto> answerList = gson.fromJson(response, answerListType);

        // 파싱된 객체 저장
        for (AsyncChatGptDto asyncChatGptDto : answerList) {
            log.info("질문 : " + asyncChatGptDto.getQuestion());
            log.info("이모지 : " + asyncChatGptDto.getEmoji());
            QuestionGpt questionGpt = QuestionGpt.builder()
                    .emoji(asyncChatGptDto.getEmoji())
                    .content(asyncChatGptDto.getQuestion())
                    .meeting(meeting)
                    .build();
            questionGptRepository.save(questionGpt);
        }
        // 시작일이 오늘인 경우에만 질문 생성
        if (meeting.getStartDay().isEqual(LocalDate.now())) {
            // ChatGPT가 만든 질문 중 1개 선택
            QuestionGpt questionGpt = questionGptRepository.chooseRandomQuestionGpt(meeting.getId(), false)
                    .orElseThrow(() -> new IllegalArgumentException("Chat GPT가 생성한 질문이 없습니다."));

            // 해당 gpt 질문을 isChoosed = true로 업데이트
            questionGpt.updateIsChoosed(true);

            // question, emoji 업데이트
            String content = questionGpt.getContent();
            String emoji = questionGpt.getEmoji();

            // 다음날 오전 8시
            LocalDateTime expireTime = LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(8, 0));

            // question insert
            Question question = Question.builder()
                    .content(content)
                    .emoji(emoji)
                    .meeting(meeting)
                    .expireTime(expireTime)
                    .build();
            questionRepository.save(question);
        }
    }
}
