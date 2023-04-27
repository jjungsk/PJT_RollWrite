package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.question.entity.QuestionParticipant;

import java.util.Optional;

public interface QuestionParticipantCustomRepository {
    Optional<Long> findRandomUserByMeetingAndIsChoosed(Long meetingId, boolean isChoosed);

    Optional<QuestionParticipant> findRandomByMeetingAndIsChoosedAndUser(Long meetingId, boolean isChoosed, Long userId);
}