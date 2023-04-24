package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.dto.FindTodayQuestionResDto;
import com.rollwrite.domain.question.entity.QAnswer;
import com.rollwrite.domain.question.entity.QQuestion;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

        LocalDateTime todayStart = today.atStartOfDay();
        LocalDateTime todayEnd = today.atTime(LocalTime.MAX);

        FindTodayQuestionResDto findTodayQuestionResponseDto = jpaQueryFactory
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
                .where(question.meeting.eq(meeting).and(question.createdAt.between(todayStart, todayEnd)))
                .fetchOne();

        return Optional.ofNullable(findTodayQuestionResponseDto);
    }
}