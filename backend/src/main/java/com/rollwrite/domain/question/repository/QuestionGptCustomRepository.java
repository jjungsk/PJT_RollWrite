package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.question.entity.QuestionGpt;

import java.util.Optional;

public interface QuestionGptCustomRepository {
    Optional<QuestionGpt> findRandomByMeetingAndIsChoosed(Long meetingId, boolean isChoosed);
}