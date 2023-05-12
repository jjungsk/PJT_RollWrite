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
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
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
    private final AnswerRepository answerRepository;
    private final MeetingRepository meetingRepository;
    private final QuestionRepository questionRepository;
    private final ParticipantRepository participantRepository;
    private final QuestionParticipantRepository questionParticipantRepository;

    @Transactional
    public void addQuestion(Long userId, AddQuestionReqDto addQuestionReqDto) {
        // 질문의 문장 길이가 40글자를 넘었을 때
        if (addQuestionReqDto.getQuestion().getBytes(StandardCharsets.ISO_8859_1).length > 40) {
            throw new IllegalArgumentException("질문 내용이 글자 수를 초과했습니다");
        }

        Participant participant = participantRepository.findParticipantByUserAndMeetingAndIsDone(userId, addQuestionReqDto.getMeetingId(), false)
                .orElseThrow(() -> new IllegalArgumentException("참여자 정보를 찾을 수 없습니다"));

        User user = participant.getUser();

        Meeting meeting = participant.getMeeting();

        // 모임의 종료 날짜가 지났을 때
        if (meeting.getEndDay().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("모임의 종료 시간이 지났습니다");
        }

        ChatGPTResDto chatGPTResDto = gptService.chatGpt(addQuestionReqDto.getQuestion() + "라는 질문에 어울리는 이모지 딱 한 개만 추천해줘, 형식은 json이야, {\"emoji\":\"😎\"}");
        String response = chatGPTResDto.getChoices().get(0).getMessage().getContent();

        // 이모지 파싱
        Gson gson = new Gson();
        Map<String, String> jsonObj = gson.fromJson(response, Map.class);
        String emoji = jsonObj.get("emoji");

        log.info("emoji : {}", emoji);

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
    public AddAnswerResDto addAnswer(Long userId, AddAnswerReqDto addAnswerReqDto, MultipartFile image) throws IOException {
        // 답변의 문장 길이가 400글자를 넘었을 때
        if (addAnswerReqDto.getAnswer().getBytes(StandardCharsets.ISO_8859_1).length > 400) {
            throw new IllegalArgumentException("답변 내용이 글자 수를 초과했습니다");
        }

        Participant participant = participantRepository.findParticipantByUserAndMeetingAndIsDone(userId, addAnswerReqDto.getMeetingId(), false)
                .orElseThrow(() -> new IllegalArgumentException("참여자 정보를 찾을 수 없습니다"));

        User user = participant.getUser();

        Meeting meeting = participant.getMeeting();

        // 만료시간이 지나지 않은 질문의 답변
        Question question = questionRepository.findQuestionByIdAndExpireTime(addAnswerReqDto.getQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("질문을 찾을 수 없습니다"));

        Optional<Answer> optionalAnswer = answerRepository.findByUserAndQuestion(user, question);

        // 답변이 이미 있을 때
        if (optionalAnswer.isPresent()) {
            throw new IllegalArgumentException("이미 답변한 질문입니다");
        }

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
            participant.updateIsDone(true);
        }

        // 질문이 정상 등록 되었을 때, 답변 포인트 생성
        Long point = user.getPoint();
        user.updatePoint(point + User.POINT);

        return AddAnswerResDto.builder()
                .participant(participant)
                .build();
    }

    @Transactional
    public void modifyAnswer(Long userId, ModifyAnswerReqDto modifyAnswerReqDto, MultipartFile image) throws IOException {
        // 답변의 문장 길이가 400글자를 넘었을 때
        if (modifyAnswerReqDto.getAnswer().getBytes(StandardCharsets.ISO_8859_1).length > 400) {
            throw new IllegalArgumentException("답변 내용이 글자 수를 초과했습니다");
        }

        Answer answer = answerRepository.findAnswerByUserAndQuestionAndExpireTime(userId, modifyAnswerReqDto.getQuestionId())
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

    @Transactional
    public void removeAnswerImage(Long userId, Long questionId) throws IOException {
        Answer answer = answerRepository.findAnswerByUserAndQuestionAndExpireTime(userId, questionId)
                .orElseThrow(() -> new IllegalArgumentException("답변을 찾을 수 없습니다"));

        // remove image
        fileService.fileDelete(answer.getImageUrl());
        answer.updateImageUrl(null);
    }

    public List<FindTodayQuestionResDto> findTodayQuestion(Long userId) {
        // 내가 참여한 진행 중인 모임 전체 조회
        List<Meeting> meetingList = participantRepository.findMeetingByUserAndIsDone(userId, false);

        // question, answer 조인
        List<FindTodayQuestionResDto> findTodayQuestionResDtoList = new ArrayList<>();
        for (Meeting meeting : meetingList) {
            Optional<FindTodayQuestionResDto> todayQuestion = questionRepository.findTodayQuestionByMeeting(userId, meeting);

            // 오늘의 질문이 있으면 리스트에 추가
            if (todayQuestion.isPresent()) {
                FindTodayQuestionResDto todayQuestionResDto = todayQuestion.get();
                // 마지막 질문일 때
                if (meeting.getEndDay().equals(todayQuestionResDto.getQuestionCreatedAt().toLocalDate())) {
                    todayQuestionResDto.updateIsFinal(true);
                }
                findTodayQuestionResDtoList.add(todayQuestionResDto);
            }
        }

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