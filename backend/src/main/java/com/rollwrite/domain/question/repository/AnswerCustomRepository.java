package com.rollwrite.domain.question.repository;


import com.rollwrite.domain.meeting.dto.AnswerDto;
import com.rollwrite.domain.meeting.dto.MeetingCalenderResDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.dto.AnswerLengthSumDto;
import com.rollwrite.domain.question.dto.ImageCountDto;
import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface AnswerCustomRepository {

    List<MeetingCalenderResDto> findMeetingCalender(User user, Meeting meeting);

    List<AnswerDto> findMeetingChatResult(Meeting meeting, Question question, Long myId);

    List<AnswerLengthSumDto> findAnswerLengthSumByMeeting(Meeting meeting);

    List<ImageCountDto> findImageCountByMeeting(Meeting meeting);

    List<Answer> findAnswerByUserAndMeeting(User user, Meeting meeting);

    Optional<Answer> findAnswerByUserAndQuestionAndExpireTime(Long userId, Long questionId);

}