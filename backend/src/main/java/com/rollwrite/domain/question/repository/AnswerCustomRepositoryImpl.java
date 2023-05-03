package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.dto.AnswerDto;
import com.rollwrite.domain.meeting.dto.MeetingCalenderResDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.dto.AnswerLengthSumDto;
import com.rollwrite.domain.question.dto.ImageCountDto;
import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.QAnswer;
import com.rollwrite.domain.question.entity.QQuestion;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.user.entity.User;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AnswerCustomRepositoryImpl implements AnswerCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QAnswer answer = QAnswer.answer;
    QQuestion question = QQuestion.question;

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

    @Override
    public List<Question> findMeetingQuestion(User user, Meeting meeting) {
        return jpaQueryFactory
                .select(answer.question)
                .from(answer)
                .join(answer.question, question)
                .where(answer.user.eq(user))
                .where(answer.meeting.eq(meeting))
                .orderBy(answer.id.desc())
                .fetch();
    }

    @Override
    public List<AnswerDto> findMeetingChatResult(Meeting meeting, Question q, Long myId) {
        return jpaQueryFactory
                .select(Projections.constructor(AnswerDto.class,
                        answer.user.nickname,
                        answer.user.profileImage,
                        answer.content,
                        answer.imageUrl,
                        answer.createdAt,
                        Expressions.constant(myId),
                        answer.user.id
                ))
                .from(answer)
                .join(answer.question, question)
                .where(answer.question.eq(q))
                .where(answer.meeting.eq(meeting))
                .fetch();
    }

    @Override
    public List<AnswerLengthSumDto> findAnswerLengthSumByMeeting(Meeting meeting) {
        return jpaQueryFactory
                .select(Projections.constructor(AnswerLengthSumDto.class,
                        answer.user.as("userId"),
                        answer.content.length().sum().as("answerLengthSum")
                ))
                .from(answer)
                .where(answer.meeting.eq(meeting))
                .groupBy(answer.user)
                .orderBy(answer.content.length().sum().desc())
                .fetch();
    }

    @Override
    public List<ImageCountDto> findImageCountByMeeting(Meeting meeting) {
        return jpaQueryFactory
                .select(Projections.constructor(ImageCountDto.class,
                        answer.user.as("userId"),
                        answer.count().as("imageCount")
                ))
                .from(answer)
                .where(answer.meeting.eq(meeting))
                .where(answer.imageUrl.isNotEmpty())
                .groupBy(answer.user)
                .orderBy(answer.count().desc())
                .fetch();
    }

    @Override
    public List<Answer> findAnswerByUserAndMeeting(User user, Meeting meeting) {
        return jpaQueryFactory
                .select(answer)
                .from(answer)
                .where(answer.user.eq(user))
                .where(answer.meeting.eq(meeting))
                .orderBy(answer.createdAt.asc())
                .fetch();
    }

}