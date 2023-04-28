package com.rollwrite.domain.question.repository;


import com.rollwrite.domain.meeting.dto.AnswerDto;
import com.rollwrite.domain.meeting.dto.MeetingCalenderResDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.user.entity.User;

import java.util.List;

public interface AnswerCustomRepository {

    List<MeetingCalenderResDto> findMeetingCalender(User user, Meeting meeting);

    List<Question> findMeetingQuestion(User user, Meeting meeting);

    List<AnswerDto> findMeetingChatResult(Meeting meeting, Question question, Long myId);
}