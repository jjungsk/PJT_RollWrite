package com.rollwrite.global.model.Fcm;

import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * FCM 공식 Request Body 형식
 */
@Getter
@ToString
@AllArgsConstructor
public class FcmMessageDto {
    private boolean validate_only;
    private Message message;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Message {
        private Notification notification; // 모든 mobile od
        private String token; // 특정 device에 알림을 보내기 위한 토큰
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Notification {
        private String title;
        private String body;
        private String image;
    }
}
