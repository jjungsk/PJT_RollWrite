package com.rollwrite.global.service;

import com.google.firebase.messaging.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 1. 특정 유저에게 알림 (특정 유저의 Token)
 * by. 유저 기기 식별 토큰은 Client단에서 서비스 접속 시 발급하여 서버에 보내야
 * 3. 다수 (한번에 최대 1000명)에게 알림 (보낼 Token List)
 * 3. 구독자에게 알림 (Kwy Word 알림)
 * 4. 전체 사용자 (콘솔 이용)
 */
@Slf4j
@Service
public class FcmService {

    // 1. 특정 유저에게 알림 (특정 유저의 Token)
    public void sendMessageFcmForm(String token, String title, String body) throws FirebaseMessagingException {
        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .setWebpushConfig(WebpushConfig.builder()
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .setLink("https://www.youtube.com/watch?v=DbrQ8zFkmF4")
                                .build())
                        .build())
                .setAndroidConfig(AndroidConfig.builder()
                        .setNotification(AndroidNotification.builder()
                                .setClickAction("https://www.youtube.com/watch?v=DbrQ8zFkmF4")
                                .build())
                        .build())
                .setToken(token)
                .build();

        String response = FirebaseMessaging.getInstance().send(message);
        log.info("firebase response : {}", response);
    }


    // 2. 다수 (한번에 최대 1000명)에게 알림 (보낼 Token List)
    public Integer sendMessageMany(Notification notification, List<String> registrationTokens) throws FirebaseMessagingException {
        MulticastMessage message = MulticastMessage.builder()
                .setNotification(notification)
                .setWebpushConfig(WebpushConfig.builder()
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .setLink("https://www.youtube.com/watch?v=DbrQ8zFkmF4")
                                .build())
                        .build())
                .setAndroidConfig(AndroidConfig.builder()
                        .setNotification(AndroidNotification.builder()
                                .setClickAction("https://www.youtube.com/watch?v=DbrQ8zFkmF4")
                                .build())
                        .build())
                .addAllTokens(registrationTokens)
                .build();
        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);

        if (response.getFailureCount() > 0) {
            List<SendResponse> responses = response.getResponses();
            List<String> failedTokens = new ArrayList<>();
            for (int i = 0; i < responses.size(); i++) {
                if (!responses.get(i).isSuccessful()) {
                    // The order of responses corresponds to the order of the registration tokens.
                    failedTokens.add(registrationTokens.get(i));
                }
            }
        }

        return response.getFailureCount();  // 실패한 토큰 수
    }

    // TODO : 3. FCM Topic 구현


}
