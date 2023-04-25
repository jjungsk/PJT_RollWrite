package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.dto.MeetingCalenderResDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.QAnswer;
import com.rollwrite.domain.question.entity.QQuestion;
import com.rollwrite.domain.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AnswerCustomRepositoryImpl implements AnswerCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QQuestion question = QQuestion.question;
    QAnswer answer = QAnswer.answer;

    @Override
    public List<MeetingCalenderResDto> findMeetingCalender(User user, Meeting meeting) {
        return jpaQueryFactory
            .select(Projections.constructor(MeetingCalenderResDto.class,
                answer.question.createdAt.as("day"),
                answer.question.content.as("question")))
            .from(answer)
            .join(answer.question, question)// TODO: .fetchJoin() 안 되는 이유 해결하기
            .where(answer.user.eq(user))
            .where(answer.meeting.eq(meeting))
            .fetch();
    }
}