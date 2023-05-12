package com.rollwrite.global.service;

import com.google.firebase.messaging.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

/**
 * 0. Web, Android, Ios 설정
 * 1. 특정 유저에게 알림 (특정 유저의 Token)
 * by. 유저 기기 식별 토큰은 Client단에서 서비스 접속 시 발급하여 서버에 보내야
 * 3. 다수 (한번에 최대 1000명)에게 알림 (보낼 Token List)
 * 3. 구독자에게 알림 (Kwy Word 알림)
 * 4. 전체 사용자 (콘솔 이용)
 */
@Slf4j
@Service
public class FcmService {

    private final String SERVICE_LINK = "https://rollwrite.co.kr";
    private final String ICON_IMAGE = "https://k8a508.p.ssafy.io/rollwrite/favicon-32x32.png";

    // 0-1. WebPush 설정
    private WebpushConfig webpushConfig() {
        return WebpushConfig.builder()
                .setFcmOptions(WebpushFcmOptions.builder()
                        .setLink(SERVICE_LINK)
                        .build())
                .setNotification(WebpushNotification.builder()
                        .setIcon(ICON_IMAGE)
                        .setImage("이미지")
                        .build())
                .build();
    }

    // 0-2. Android 설정
    private AndroidConfig androidConfig() {
        return AndroidConfig.builder()
                .setNotification(AndroidNotification.builder()
                        .setClickAction(SERVICE_LINK)
                        .setIcon(ICON_IMAGE)
                        .setImage("이미지")
                        .build())
                .build();
    }

    // 0-3. Ios 설정
    private ApnsConfig apnsConfig() {
        return ApnsConfig.builder()
                .setAps(Aps.builder()
                        .build())
                .setFcmOptions(ApnsFcmOptions.builder()
                        .setImage("이미지")
                        .build())
                .build();
    }

    // 1. 특정 유저에게 알림 (특정 유저의 Token)
    public void sendMessageOne(Notification notification, String firebaseToken) throws FirebaseMessagingException {
        Message message = Message.builder()
                .setNotification(notification)
                .setWebpushConfig(webpushConfig())
                .setAndroidConfig(androidConfig())
                .setApnsConfig(apnsConfig())
                .setToken(firebaseToken)
                .build();

        String response = FirebaseMessaging.getInstance().send(message);
        log.info("firebase response : {}", response);
    }


    // 2. 다수 (한번에 최대 1000명)에게 알림 (보낼 Token List)
    public Integer sendMessageMany(Notification notification, List<String> firebaseTokenList) throws FirebaseMessagingException {
        MulticastMessage message = MulticastMessage.builder()
                .setNotification(notification)
                .setWebpushConfig(webpushConfig())
                .setAndroidConfig(androidConfig())
                .setApnsConfig(apnsConfig())
                .addAllTokens(firebaseTokenList)
                .build();
        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);

        if (response.getFailureCount() > 0) {
            List<SendResponse> responses = response.getResponses();
            List<String> failedTokens = new ArrayList<>();
            for (int i = 0; i < responses.size(); i++) {
                if (!responses.get(i).isSuccessful()) {
                    // The order of responses corresponds to the order of the registration tokens.
                    failedTokens.add(firebaseTokenList.get(i));
                }
            }
        }

        return response.getFailureCount();  // 실패한 토큰 수
    }


    // TODO : 4. FCM Topic 구현
    public void subscribeTopic(List<String> tokenList, String topic) throws FirebaseMessagingException {

        FirebaseMessaging.getInstance().subscribeToTopic(tokenList, topic);

    }

    public void unSubscribeTopic(List<String> tokenList, String topic) throws FirebaseMessagingException {

        FirebaseMessaging.getInstance().unsubscribeFromTopic(tokenList, topic);
    }

    public void sendMessageTopic(String topic, String title, String body) throws FirebaseMessagingException {

        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .setWebpushConfig(webpushConfig())
                .setTopic(topic)
                .build();

        FirebaseMessaging.getInstance();
    }

}
