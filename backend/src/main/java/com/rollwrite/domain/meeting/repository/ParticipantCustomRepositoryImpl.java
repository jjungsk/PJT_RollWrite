package com.rollwrite.domain.meeting.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.dto.MeetingFindUserDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QMeeting;
import com.rollwrite.domain.meeting.entity.QParticipant;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.rollwrite.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class ParticipantCustomRepositoryImpl implements ParticipantCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUser user = QUser.user;
    QMeeting meeting = QMeeting.meeting;
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
    public List<Meeting> findFinisihedMeetingByUser(Long userId, Pageable pageable) {
        LocalDate today = LocalDate.now();
        return jpaQueryFactory
                .select(participant.meeting)
                .from(participant)
                .where(participant.user.id.eq(userId))
                .where(participant.isDone.eq(true))
                .where(participant.meeting.endDay.before(today).or(participant.meeting.endDay.eq(today)))
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

    @Override
    public List<MeetingFindUserDto> findMeetingAndUserAndTitleByProgress(boolean isDone) {
        List<MeetingFindUserDto> meetingFindUserDtoList = jpaQueryFactory
                .select(Projections.constructor(MeetingFindUserDto.class,
                        participant.user.id.as("userId"),
                        participant.meeting.id.as("meetingId"),
                        participant.meeting.title
                ))
                .from(participant)
                .join(participant.user, user)
                .join(participant.meeting, meeting)
                .where(participant.isDone.eq(false))
                .fetch();
        return meetingFindUserDtoList;
    }
}