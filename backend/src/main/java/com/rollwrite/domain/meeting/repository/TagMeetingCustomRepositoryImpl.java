package com.rollwrite.domain.meeting.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.QTag;
import com.rollwrite.domain.meeting.entity.QTagMeeting;
import com.rollwrite.domain.meeting.entity.TagMeeting;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TagMeetingCustomRepositoryImpl implements TagMeetingCustomRepository {

    private final JPAQueryFactory queryFactory;

    QTagMeeting tagMeeting = QTagMeeting.tagMeeting;
    QTag tag = QTag.tag;

    @Override
    public List<TagMeeting> findTagMeetingByMeeting
        (Meeting meeting) {
        return queryFactory
            .selectFrom(tagMeeting)
            .join(tagMeeting.tag, tag).fetchJoin()
            .where(tagMeeting.meeting.eq(meeting))
            .fetch();
    }
}
