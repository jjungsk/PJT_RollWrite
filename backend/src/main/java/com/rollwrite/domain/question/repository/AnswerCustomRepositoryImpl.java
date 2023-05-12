package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.dto.AnswerCountDto;
import com.rollwrite.domain.meeting.dto.AnswerDto;
import com.rollwrite.domain.meeting.dto.MeetingCalenderResDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.dto.AnswerLengthSumDto;
import com.rollwrite.domain.question.dto.ImageCountDto;
import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.QAnswer;
import com.rollwrite.domain.question.entity.QQuestion;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.user.entity.QUser;
import com.rollwrite.domain.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AnswerCustomRepositoryImpl implements AnswerCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUser user = QUser.user;
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
                .join(answer.question, question).on(answer.question.eq(q))
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

    @Override
    public Optional<Answer> findAnswerByUserAndQuestionAndExpireTime(Long userId, Long questionId) {
        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(answer)
                .join(answer.user, user).on(answer.user.id.eq(userId))
                .join(answer.question, question).on(answer.question.id.eq(questionId).and(answer.question.expireTime.after(LocalDateTime.now())))
                .fetchOne());
    }

    @Override
    public List<AnswerCountDto> findAnswerCnt(Meeting meeting) {
        return jpaQueryFactory
                .select(Projections.constructor(AnswerCountDto.class,
                        answer.question.as("question"),
                        answer.count().as("answerCount")))
                .from(answer)
                .where(answer.meeting.eq(meeting))
                .groupBy(answer.question)
                .orderBy(answer.question.createdAt.asc())
                .fetch();
    }

    @Override
    public List<Answer> findByMeetingIdAndUserIdAndCreatedAt(Long userId, Long meetingId) {
        LocalDateTime localDateTime = LocalDateTime.now();
        if (localDateTime.getHour() < 8) localDateTime = localDateTime.minusDays(1L).withHour(8).withMinute(0).withSecond(0);
        else localDateTime = localDateTime.withHour(8).withMinute(0).withSecond(0);

        log.info("localDateTime : {}", localDateTime);
        return jpaQueryFactory
                .selectFrom(answer)
                .where(answer.meeting.id.eq(meetingId))
                .where(answer.user.id.ne(userId))
                .where(answer.createdAt.after(localDateTime))
                .fetch();
    }

}