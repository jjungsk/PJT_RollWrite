package com.rollwrite.domain.notification.service;

import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationService {

    private final UserRepository userRepository;

    // 1. firebase token 저장
    @Transactional
    public void updateFirebaseToken(Long userId, String firebaseToken) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        log.info("user 정보 : {}. firbaseToken : {}", user.toString(), firebaseToken);
        user.updateToken(firebaseToken);
        log.info("user 정보 : {}. firbaseToken : {}", user.toString(), firebaseToken);
    }

}
