package com.rollwrite.domain.notification.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rollwrite.domain.notification.entity.Notification;
import com.rollwrite.domain.notification.entity.NotificationType;
import com.rollwrite.domain.notification.entity.QNotification;
import com.rollwrite.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class NotificationCustomRepositoryImpl implements NotificationCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUser user = QUser.user;
    QNotification notification = QNotification.notification;

    @Override
    public Optional<Notification> findNoticeByIdAndUser(Long userId, Long noticeId) {
        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(notification)
                .join(notification.user, user).on(notification.user.id.eq(userId))
                .where(notification.id.eq(noticeId))
                .where(notification.type.eq(NotificationType.NOTICE))
                .fetchOne());
    }
}
