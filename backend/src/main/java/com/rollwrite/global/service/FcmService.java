package com.rollwrite.global.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.messaging.*;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.model.Fcm.FcmMessageManyDto;
import com.rollwrite.global.model.Fcm.FcmMessageOneDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 0. Firebase로 부터 AccessToken 가져오기
 * 1. FCM 으로 Message 보내기
 * 2. 특정 유저에게 알림 (특정 유저의 Token)
 * by. 유저 기기 식별 토큰은 Client단에서 서비스 접속 시 발급하여 서버에 보내야
 * 3. 다수 (한번에 최대 1000명)에게 알림 (보낼 Token List)
 * 4. 구독자에게 알림 (Kwy Word 알림)
 * 5. 전체 사용자 (콘솔 이용)
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class FcmService {

    @Value("${fcm.key.path}")
    private String FIREBASE_CONFIG_PATH;
    @Value("${fcm.key.url}")
    private String FIREBASE_ALARM_SEND_API_URI;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    // 0. Firebase로 부터 AccessToken 가져오기
    private String getAccessToken() throws IOException {
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource(FIREBASE_CONFIG_PATH).getInputStream()).createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        googleCredentials.refreshIfExpired();

        return googleCredentials.getAccessToken().getTokenValue();
    }

    // 1. SendMessage Form
    public void sendMessage(String message) throws IOException {
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                .url(FIREBASE_ALARM_SEND_API_URI)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        OkHttpClient client = new OkHttpClient();
        Response response = client.newCall(request).execute();
        log.info("Fcm accessToken : {}", getAccessToken());
        log.info("Fcm Send Message : {}", response.toString());
    }


    // 2-1. 알림 파라미터들을 FCM이 요구하는 body 형태로 가공
    public String makeMessageOne(String targetToken, String title, String body) throws JsonProcessingException {
        FcmMessageOneDto fcmMessageOneDto = FcmMessageOneDto.builder().message(FcmMessageOneDto.Message.builder().token(targetToken).notification(FcmMessageOneDto.Notification.builder().title(title).body(body).build()).build()).validateOnly(false).build();

        return objectMapper.writeValueAsString(fcmMessageOneDto);
    }

    // 2. 특정 유저에게 알림 (특정 유저의 Token)
    public void sendMessageOne(String targetToken, String title, String body) throws IOException {
        String message = makeMessageOne(targetToken, title, body);
        sendMessage(message);
    }

    // 3-1. 알림 파라미터들을 FCM이 요구하는 body 형태로 가공
    public String makeMessageMany(ArrayList<String> tokenList, String title, String body) throws JsonProcessingException {
        FcmMessageManyDto fcmMessageManyDto = FcmMessageManyDto.builder().message(FcmMessageManyDto.Message.builder().registration_ids(tokenList).notification(FcmMessageManyDto.Notification.builder().title(title).body(body).build()).build()).validateOnly(false).build();

        return objectMapper.writeValueAsString(fcmMessageManyDto);
    }

    // 3. 다수 (한번에 최대 1000명)에게 알림 (보낼 Token List)
    public void sendMessageMany(ArrayList<String> tokenList, String title, String body) throws IOException {
        String message = makeMessageMany(tokenList, title, body);
        sendMessage(message);
    }

    // TODO : FCM Template Header AcessToken 담아 보내기
    public void sendTemplate(String token) throws FirebaseMessagingException {
        Message message = Message.builder()
                .setNotification(new Notification("title Test", "bodyTest"))
                .setToken(token).build();

        String response = FirebaseMessaging.getInstance().send(message);
        log.debug("Successfully sent message: {}", response);
    }


}
