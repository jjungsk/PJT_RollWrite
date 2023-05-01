package com.rollwrite.domain.question.service;

import com.google.gson.Gson;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.repository.MeetingRepository;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.question.dto.*;
import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import com.rollwrite.domain.question.repository.AnswerRepository;
import com.rollwrite.domain.question.repository.QuestionParticipantRepository;
import com.rollwrite.domain.question.repository.QuestionRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.model.chatgpt.ChatGPTResDto;
import com.rollwrite.global.service.FileService;
import com.rollwrite.global.service.GptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@EnableScheduling
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final GptService gptService;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final AnswerRepository answerRepository;
    private final MeetingRepository meetingRepository;
    private final QuestionRepository questionRepository;
    private final ParticipantRepository participantRepository;
    private final QuestionParticipantRepository questionParticipantRepository;

    @Transactional
    public void addQuestion(Long userId, AddQuestionReqDto addQuestionReqDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 내가 참여한 진행 중인 모임
        Meeting meeting = participantRepository.findMeetingByUserAndMeetingAndIsDone(userId, addQuestionReqDto.getMeetingId(), false)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        ChatGPTResDto chatGPTResDto = gptService.chatGpt(addQuestionReqDto.getQuestion() + "라는 질문에 어울리는 이모지 딱 한 개만 추천해줘, 형식은 json이야, {\"emoji\":\"😎\"}");
        String response = chatGPTResDto.getChoices().get(0).getMessage().getContent();

        // 이모지 파싱
        Gson gson = new Gson();
        Map<String, String> jsonObj = gson.fromJson(response, Map.class);
        String emoji = jsonObj.get("emoji");

        // question_participant insert
        QuestionParticipant questionParticipant = QuestionParticipant.builder()
                .user(user)
                .meeting(meeting)
                .content(addQuestionReqDto.getQuestion())
                .emoji(emoji)
                .build();
        questionParticipantRepository.save(questionParticipant);
    }

    @Transactional
    public void addAnswer(Long userId, AddAnswerReqDto addAnswerReqDto, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 내가 참여한 진행 중인 모임
        Meeting meeting = participantRepository.findMeetingByUserAndMeetingAndIsDone(userId, addAnswerReqDto.getMeetingId(), false)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // 만료시간이 지나지 않은 질문
        Question question = questionRepository.findQuestionByIdAndExpireTime(addAnswerReqDto.getQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("질문을 찾을 수 없습니다"));

        String imageUrl = null;
        if (image != null && !image.isEmpty())
            imageUrl = fileService.fileUpload("answer", image);

        // answer insert
        Answer answer = Answer.builder()
                .user(user)
                .meeting(meeting)
                .question(question)
                .content(addAnswerReqDto.getAnswer())
                .imageUrl(imageUrl)
                .build();
        answerRepository.save(answer);

        // 마지막 질문에 답했을 때 질문 종료
        if (meeting.getEndDay().equals(question.getCreatedAt().toLocalDate())) {
            Participant participant = participantRepository.findByMeetingAndUser(meeting, user)
                    .orElseThrow(() -> new IllegalArgumentException("참여자를 찾을 수 없습니다"));

            participant.updateIsDone(true);
        }
    }

    @Transactional
    public void modifyAnswer(Long userId, ModifyAnswerReqDto modifyAnswerReqDto, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 만료시간이 지나지 않은 질문
        Question question = questionRepository.findQuestionByIdAndExpireTime(modifyAnswerReqDto.getQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("질문을 찾을 수 없습니다"));

        Answer answer = answerRepository.findByUserAndQuestion(user, question)
                .orElseThrow(() -> new IllegalArgumentException("답변을 찾을 수 없습니다"));

        // change image
        if (image != null && !image.isEmpty()) {
            fileService.fileDelete(answer.getImageUrl());
            String imageUrl = fileService.fileUpload("answer", image);
            answer.updateImageUrl(imageUrl);
        }

        // change content
        if (modifyAnswerReqDto.getAnswer() != null) {
            answer.updateContent(modifyAnswerReqDto.getAnswer());
        }
    }

    public List<FindTodayQuestionResDto> findTodayQuestion(Long userId) {
        // 내가 참여한 진행 중인 모임 전체 조회
        List<Meeting> meetingList = participantRepository.findMeetingByUserAndIsDone(userId, false);

        // question, answer 조인
        List<FindTodayQuestionResDto> findTodayQuestionResDtoList = new ArrayList<>();
        for (Meeting meeting : meetingList) {
            Optional<FindTodayQuestionResDto> todayQuestion = questionRepository.findTodayQuestionByMeeting(meeting);

            // 오늘의 질문이 있으면 리스트에 추가
            todayQuestion.ifPresent(findTodayQuestionResDtoList::add);
        }

        // sort
        Collections.sort(findTodayQuestionResDtoList, new Comparator<>() {
            @Override
            public int compare(FindTodayQuestionResDto o1, FindTodayQuestionResDto o2) {
                // answer가 null인 경우를 최우선으로 처리
                if (o1.getAnswer() == null && o2.getAnswer() != null) {
                    return -1;
                } else if (o1.getAnswer() != null && o2.getAnswer() == null) {
                    return 1;
                }

                // 종료일이 임박한 모임이 우선
                int day1 = o1.getDay();
                int day2 = o2.getDay();
                if (day1 < day2) {
                    return -1;
                } else if (day1 > day2) {
                    return 1;
                }

                return 0;
            }
        });

        return findTodayQuestionResDtoList;
    }

    public List<FindQuestionResDto> findQuestion(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        List<Question> questionList = questionRepository.findAllByMeeting(meeting);

        //  List<Question> -> List<FindQuestionResDto>
        return questionList.stream().map(question -> FindQuestionResDto.builder()
                .question(question)
                .build()).collect(Collectors.toList());
    }
}