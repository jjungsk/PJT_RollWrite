package com.rollwrite.global.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Notification;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.model.Fcm.FcmNotificationReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 1. 특정 사용자에게 알림을 보냄 = "해당 타켓 유저 기기 토큰"
 *    by. 유저 기기 식별 토큰은 Client단에서 서비스 접속 시 발급하여 서버에 보내야
 * 2. 전체 사용자 = "콘솔 이용"
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class FcmService {

    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;

    public String sendNotificationByToken(FcmNotificationReqDto fcmNotificationReqDto) {
        User user = userRepository.findById(fcmNotificationReqDto.getTargetUserId())
                .orElseThrow(() -> new IllegalArgumentException("알림을 받을 회원 정보가 없습니다."));
        
        // user Entity에 firebaseToken 이 있어야
        if (user.getFirebaseToken() != null) {

        }

        return "";
    }

}
