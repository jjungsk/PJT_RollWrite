package com.rollwrite.domain.meeting.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.dto.AwardUserDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QAward;
import com.rollwrite.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class AwardCustomRepositoryImpl implements AwardCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUser user = QUser.user;
    QAward award = QAward.award;


    @Override
    public List<AwardUserDto> findAwardUser(Meeting meeting) {
        return jpaQueryFactory
                .select(Projections.constructor(AwardUserDto.class,
                        award.user.id.as("userId"),
                        award.user.nickname,
                        award.user.profileImage,
                        award.type
                ))
                .from(award)
                .join(award.user, user)
                .where(award.meeting.eq(meeting))
                .fetch();
    }
}