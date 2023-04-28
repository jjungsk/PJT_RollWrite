package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.dto.FindTodayQuestionResDto;
import com.rollwrite.domain.question.entity.Question;

import java.util.Optional;

public interface QuestionCustomRepository {
    Optional<FindTodayQuestionResDto> findTodayQuestionByMeeting(Meeting meeting);

    Optional<Question> findQuestionByIdAndExpireTime(Long questionId);
}