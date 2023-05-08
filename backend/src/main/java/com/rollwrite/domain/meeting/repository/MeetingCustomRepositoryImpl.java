package com.rollwrite.domain.meeting.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.QMeeting;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
public class MeetingCustomRepositoryImpl implements MeetingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QMeeting meeting = QMeeting.meeting;

    @Override
    public List<Long> findMeetingByToday() {
        return jpaQueryFactory
                .select(meeting.id)
                .from(meeting)
                .where(meeting.startDay.before(LocalDate.now()).or(meeting.startDay.eq(LocalDate.now())))
                .where(meeting.endDay.after(LocalDate.now()).or(meeting.endDay.eq(LocalDate.now())))
                .fetch();
    }

}