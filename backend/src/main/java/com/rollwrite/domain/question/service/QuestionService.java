package com.rollwrite.domain.question.service;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.repository.MeetingRepository;
import com.rollwrite.domain.question.dto.AddQuestionRequestDto;
import com.rollwrite.domain.question.dto.AddQuestionResponseDto;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import com.rollwrite.domain.question.repository.QuestionParticipantRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Period;

@Slf4j
@Service
@EnableScheduling
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final UserRepository userRepository;
    private final MeetingRepository meetingRepository;
    private final QuestionParticipantRepository questionParticipantRepository;

    @Transactional
    public AddQuestionResponseDto addQuestion(Long userId, AddQuestionRequestDto addQuestionRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Meeting meeting = meetingRepository.findById(addQuestionRequestDto.getMeetingId())
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // TODO : call GPT api for picking emoji!
        String emoji = "";

        // question_participant insert
        QuestionParticipant questionParticipant = QuestionParticipant.builder()
                .user(user)
                .meeting(meeting)
                .content(addQuestionRequestDto.getQuestion())
                .emoji(emoji)
                .build();
        questionParticipantRepository.save(questionParticipant);

        // 내가 meeting에서 한 질문의 개수
        int usage = Math.toIntExact(questionParticipantRepository.countByUserAndMeeting(user, meeting));
        log.info("usage : " + usage);

        // meeting의 참여자 수
        int participantCnt = meeting.getParticipantList().size();
        log.info("participantCnt : " + participantCnt);

        // meeting의 전체 기간
        double meetingPeriod = Period.between(meeting.getEndDay(), meeting.getStartDay()).getDays();
        log.info("meetingPeriod : " + meetingPeriod);

        return AddQuestionResponseDto.builder()
                .usage(usage)
                .limit((int) Math.ceil(meetingPeriod / participantCnt))
                .build();
    }
}