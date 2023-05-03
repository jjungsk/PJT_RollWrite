package com.rollwrite.domain.meeting.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QParticipant;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class ParticipantCustomRepositoryImpl implements ParticipantCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QParticipant participant = QParticipant.participant;

    @Override
    public List<Meeting> findMeetingByUserAndIsDone(Long userId, boolean isDone) {
        return jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.id.eq(userId))
                .where(participant.isDone.eq(isDone))
                .fetch();
    }

    @Override
    public List<Meeting> findTodayMeetingByUser(Long userId) {
        return jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.id.eq(userId))
                .where(participant.meeting.startDay.before(LocalDate.now()).or(participant.meeting.startDay.eq(LocalDate.now())))
                .where(participant.meeting.endDay.after(LocalDate.now()).or(participant.meeting.endDay.eq(LocalDate.now())))
                .fetch();
    }

    @Override
    public List<Meeting> findFinisihedMeetingByUser(Long userId, Pageable pageable) {
        LocalDate today = LocalDate.now();
        return jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.id.eq(userId))
                .where(participant.isDone.eq(true))
                .where(participant.meeting.endDay.before(today))
                .offset(pageable.getOffset())   // 페이지 번호
                .limit(pageable.getPageSize())  // 페이지 사이즈
                .fetch();
    }

    @Override
    public Optional<Meeting> findMeetingByUserAndMeetingAndIsDone(Long userId, Long meetingId,
                                                                  boolean isDone) {
        return Optional.ofNullable(jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.id.eq(userId))
                .where(participant.meeting.id.eq(meetingId))
                .where(participant.isDone.eq(isDone))
                .fetchOne());
    }

}