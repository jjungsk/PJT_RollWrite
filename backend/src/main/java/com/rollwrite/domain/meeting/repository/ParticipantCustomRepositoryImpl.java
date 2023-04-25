package com.rollwrite.domain.meeting.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.entity.QParticipant;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ParticipantCustomRepositoryImpl implements ParticipantCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QParticipant participant = QParticipant.participant;

    @Override
    public List<Participant> findParticipantByUser(Long userId) {
        return jpaQueryFactory
            .selectFrom(participant)
            .where(participant.user.id.eq(userId))
            .where(participant.isDone.eq(false))
            .fetch();
    }

    @Override
    public List<Meeting> findMeetingByUser(Long userId) {
        return jpaQueryFactory
            .select(participant.meeting)
            .from(participant)
            .where(participant.user.id.eq(userId))
            .fetch();
    }
}
