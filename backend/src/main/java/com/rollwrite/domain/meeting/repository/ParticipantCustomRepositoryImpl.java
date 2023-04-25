package com.rollwrite.domain.meeting.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QParticipant;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ParticipantCustomRepositoryImpl implements ParticipantCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    QParticipant participant = QParticipant.participant;

    @Override
    public List<Meeting> findMeetingByUser(Long userId) {
        return jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.id.eq(userId))
                .fetch();
    }
}