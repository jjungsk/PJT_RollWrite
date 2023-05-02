package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.question.entity.QQuestionGpt;
import com.rollwrite.domain.question.entity.QuestionGpt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class QuestionGptCustomRepositoryImpl implements QuestionGptCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QQuestionGpt questionGpt = QQuestionGpt.questionGpt;

    @Override
    public Optional<QuestionGpt> chooseRandomQuestionGpt(Long meetingId, boolean isChoosed) {
        return Optional.ofNullable(jpaQueryFactory
                .select(questionGpt)
                .from(questionGpt)
                .where(questionGpt.meeting.id.eq(meetingId))
                .where(questionGpt.isChoosed.eq(isChoosed))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(1)
                .fetchOne());
    }
}