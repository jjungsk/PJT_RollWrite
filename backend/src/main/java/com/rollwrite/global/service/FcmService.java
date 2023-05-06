package com.rollwrite.global.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.model.Fcm.FcmMessageOneDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * 1. 특정 사용자에게 알림을 보냄 = "해당 타켓 유저 기기 토큰"
 *    by. 유저 기기 식별 토큰은 Client단에서 서비스 접속 시 발급하여 서버에 보내야
 * 2. 전체 사용자 = "콘솔 이용"
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
        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(FIREBASE_CONFIG_PATH).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        googleCredentials.refreshIfExpired();

        return googleCredentials.getAccessToken().getTokenValue();
    }

    /**
     * 1-1. 알림 파라미터들을 FCM이 요구하는 body 형태로 가공
     * targetToken : firebase token
     * title : 알림 제목
     * body : 알림 내룔
     */
    public String makeMessage(String targetToken, String title, String body)
            throws JsonProcessingException {
        FcmMessageOneDto fcmMessageOneDto = FcmMessageOneDto.builder()
                .message(FcmMessageOneDto.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessageOneDto.Notification.builder()
                                .title(title)
                                .body(body)
                                .build())
                        .build())
                .validateOnly(false)
                .build();

        return objectMapper.writeValueAsString(fcmMessageOneDto);
    }

    /**
     * 1-2. 알림 push를 보내는 역할을 하는 함수
     * targetToken : push alarm을 받을 클라이언트 앱의 식별 토큰
     */
    public void sendMessageTo(String targetToken, String title, String body) throws IOException {

        String message = makeMessage(targetToken, title, body);

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                .url(FIREBASE_ALARM_SEND_API_URI)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        log.info("fcm accessToken : {}", getAccessToken());
        Response response = client.newCall(request).execute();

        log.info("Fcm Send Message : {}", response.message());
    }

}
