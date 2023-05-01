package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.question.entity.QuestionParticipant;

import java.util.Optional;

public interface QuestionParticipantCustomRepository {
    Optional<Long> chooseRandomParticipant(Long meetingId, boolean isChoosed);

    Optional<QuestionParticipant> chooseRandomQuestionParticipant(Long meetingId, boolean isChoosed, Long userId);
}