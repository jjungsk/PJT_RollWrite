package com.rollwrite.domain.notification.repository;

import com.rollwrite.domain.notification.entity.Notification;
import com.rollwrite.domain.notification.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>, NotificationCustomRepository {
    List<Notification> findAllByType(NotificationType type);
}
