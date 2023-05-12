package com.rollwrite.domain.notification.repository;

import com.rollwrite.domain.notification.entity.Notification;

import java.util.Optional;

public interface NotificationCustomRepository {
    Optional<Notification> findNoticeByIdAndUser(Long userId, Long noticeId);
}
