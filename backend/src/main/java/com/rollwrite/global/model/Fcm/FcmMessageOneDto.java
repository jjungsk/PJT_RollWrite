package com.rollwrite.global.model.Fcm;

import com.google.firebase.messaging.WebpushConfig;
import lombok.*;

/**
 * FCM 공식 Request Body 형식
 */
@Getter
@Builder
@ToString
@AllArgsConstructor
public class FcmMessageOneDto {
    private boolean validateOnly;
    private Message message;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Message {
        private String token; // 특정 device에 알림을 보내기 위한 토큰
        private Notification notification; // 모든 mobile od
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
