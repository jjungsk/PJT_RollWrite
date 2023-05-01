package com.rollwrite.domain.question.repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.question.entity.QQuestionParticipant;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class QuestionParticipantCustomRepositoryImpl implements QuestionParticipantCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QQuestionParticipant questionParticipant = QQuestionParticipant.questionParticipant;

    @Override
    public Optional<Long> chooseRandomParticipant(Long meetingId, boolean isChoosed) {
        return Optional.ofNullable(jpaQueryFactory
                .select(questionParticipant.user.id)
                .from(questionParticipant)
                .where(questionParticipant.meeting.id.eq(meetingId))
                .where(questionParticipant.isChoosed.eq(isChoosed))
                .groupBy(questionParticipant.user)
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(1)
                .fetchFirst());
    }

    @Override
    public Optional<QuestionParticipant> chooseRandomQuestionParticipant(Long meetingId, boolean isChoosed, Long userId) {
        return Optional.ofNullable(jpaQueryFactory
                .select(questionParticipant)
                .from(questionParticipant)
                .where(questionParticipant.meeting.id.eq(meetingId))
                .where(questionParticipant.isChoosed.eq(isChoosed))
                .where(questionParticipant.user.id.eq(userId))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(1)
                .fetchFirst());
    }
}