package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.dto.FindTodayQuestionResDto;
import com.rollwrite.domain.question.entity.QAnswer;
import com.rollwrite.domain.question.entity.QQuestion;
import com.rollwrite.domain.question.entity.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class QuestionCustomRepositoryImpl implements QuestionCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    QQuestion question = QQuestion.question;
    QAnswer answer = QAnswer.answer;

    @Override
    public Optional<FindTodayQuestionResDto> findTodayQuestionByMeeting(Meeting meeting) {
        LocalDate today = LocalDate.now();

        FindTodayQuestionResDto findTodayQuestionResDto = jpaQueryFactory
                .select(Projections.constructor(FindTodayQuestionResDto.class,
                        question.meeting.id.as("meetingId"),
                        question.meeting.title.as("title"),
                        Expressions.numberTemplate(Integer.class,
                                "function('DATEDIFF', {0}, {1})", question.meeting.endDay, today).as("day"),
                        question.id.as("questionId"),
                        question.content.as("question"),
                        question.emoji.as("emoji"),
                        answer.content.as("answer"),
                        answer.imageUrl.as("image")))
                .from(question)
                .leftJoin(answer).on(question.eq(answer.question))
                .where(question.meeting.eq(meeting))
                .orderBy(question.id.desc())
                .limit(1)
                .fetchOne();

        return Optional.ofNullable(findTodayQuestionResDto);
    }

    @Override
    public Optional<Question> findQuestionByIdAndExpireTime(Long questionId) {
        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(question)
                .where(question.id.eq(questionId))
                .where(question.expireTime.after(LocalDateTime.now()))
                .fetchOne());
    }
}