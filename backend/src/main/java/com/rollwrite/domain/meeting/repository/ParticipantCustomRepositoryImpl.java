package com.rollwrite.domain.meeting.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QParticipant;
import com.rollwrite.domain.user.entity.User;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ParticipantCustomRepositoryImpl implements ParticipantCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    QParticipant participant = QParticipant.participant;

    @Override
    public List<Meeting> findMeetingByUser(User user) {
        return jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.eq(user))
                .fetch();
    }
}