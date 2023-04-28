package com.rollwrite.domain.meeting.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.dto.StatisticUserDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QStatistics;
import com.rollwrite.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class StatisticsCustomRepositoryImpl implements StatisticsCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QStatistics statistics = QStatistics.statistics;
    QUser user = QUser.user;

    @Override
    public List<StatisticUserDto> findStatisticUser(Meeting meeting) {
        return jpaQueryFactory
                .select(Projections.constructor(StatisticUserDto.class,
                        statistics.user.id.as("userId"),
                        statistics.user.nickname,
                        statistics.user.profileImage,
                        statistics.type
                ))
                .from(statistics)
                .join(statistics.user, user)
                .where(statistics.meeting.eq(meeting))
                .fetch();
    }
}