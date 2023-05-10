package com.rollwrite.domain.admin.service;

import com.rollwrite.domain.admin.dto.FindNoticeResDto;
import com.rollwrite.domain.notification.entity.Notification;
import com.rollwrite.domain.notification.entity.NotificationType;
import com.rollwrite.domain.notification.repository.NotificationRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public List<FindNoticeResDto> findNotice() {
        List<Notification> notificationList = notificationRepository.findAllByType(NotificationType.NOTICE);

        return notificationList.stream().map(notification -> FindNoticeResDto.builder()
                .notification(notification)
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public void addNotice(Long userId, String content) {
        // 공지의 문장 길이가 60글자를 넘었을 때
        if (content.getBytes(StandardCharsets.ISO_8859_1).length > 60) {
            throw new IllegalArgumentException("공지 내용이 글자 수를 초과했습니다");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // notification insert
        Notification notification = Notification.builder()
                .content(content)
                .user(user)
                .type(NotificationType.NOTICE)
                .build();
        notificationRepository.save(notification);
    }

    @Transactional
    public void modifyNotice(Long userId, Long noticeId, String content) {
        // 공지의 문장 길이가 60글자를 넘었을 때
        if (content.getBytes(StandardCharsets.ISO_8859_1).length > 60) {
            throw new IllegalArgumentException("공지 내용이 글자 수를 초과했습니다");
        }

        Notification notification = notificationRepository.findNoticeByIdAndUser(userId, noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지를 찾을 수 없습니다"));

        notification.updateContent(content);
    }

    @Transactional
    public void removeNotice(Long userId, Long noticeId) {
        Notification notification = notificationRepository.findNoticeByIdAndUser(userId, noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지를 찾을 수 없습니다"));

        notificationRepository.delete(notification);
    }
}
