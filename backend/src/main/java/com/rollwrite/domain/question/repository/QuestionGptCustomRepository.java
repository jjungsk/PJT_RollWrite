package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.QuestionGpt;

import java.util.Optional;

public interface QuestionGptCustomRepository {
    Optional<QuestionGpt> chooseRandomQuestionGpt(Long meetingId, boolean isChoosed);

    void deleteQuestionNotUsedByMeeting(Meeting meeting);
}