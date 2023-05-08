package com.rollwrite.domain.notification.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Notification;
import com.rollwrite.domain.notification.service.NotificationService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import com.rollwrite.global.service.FcmService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Api(tags = {"05. Notification-Controller (FCM, 공지 관련)"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final FcmService fcmService;
    private final NotificationService notificationService;

    // 1. 유저별 개인 FCM Token 저장
    @ApiOperation(value = "FCM 토큰 저장", notes = "알림 허용 유저에 한해 Token은 DB에 저장")
    @Parameter(name = "firebaseToekn", description = "FCM에서 받은 유저의 Token")
    @PutMapping("/token/{firebaseToken}")
    public ResponseEntity<ApiResponse<?>> saveFirebaseToken(@ApiIgnore Authentication authentication, @PathVariable String firebaseToken) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();

        notificationService.updateFirebaseToken(userId, firebaseToken);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_FCM_TOKEN_SUCCESS), HttpStatus.OK);
    }

    // 2. FCM 알림 보내기 - 개인
    @ApiOperation(value = "(개인) FCM 알림 보내기", notes = "Token 한개에 알람 보내기")
    @Parameter(name = "firebaseToken", description = "FCM에서 받은 유저의 Token")
    @PostMapping("/individual")
    public ResponseEntity<ApiResponse<?>> sendMessageTo(String targetToken, String title, String body) throws IOException, FirebaseMessagingException {

        fcmService.sendMessageOne(targetToken, title, body);
        fcmService.sendMessageFcmForm(targetToken);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // 3. FCM 알림 보내기 - 다수 (한번에 최대 1000명)
    @ApiOperation(value = "(다수) FCM 알림 보내기", notes = "ArrayList<String> 알람 보내기")
    @Parameter(name = "firebaseToekn", description = "알림 보낼 Token List")
    @PostMapping("/multi")
    public ResponseEntity<ApiResponse<?>> sendMessageMany(@RequestParam ArrayList<String> tokenList, String title, String body) throws FirebaseMessagingException {
        log.info("FCM tokenList : {}", tokenList.toString());

        Notification notification = new Notification(title, body);
        fcmService.sendMessageMany(notification, tokenList);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // 4. FCM 자동 알림 보내기 Main
    @Scheduled(cron = "0 0 8 * * *") // sec min hour(24) day month dayOfWeek(ex.MON-FRI)
    @ApiOperation(value = "(자동) FCM 알림 보내기", notes = "오전 8시 질문 생성 알람 보내기")
    @Parameter(name = "firebaseToekn", description = "알림 보낼 Token List")
    @PostMapping("/auto")
    public ResponseEntity<ApiResponse<?>> sendMessageAuto() throws FirebaseMessagingException {
        LocalDateTime localDateTime = LocalDateTime.now();
        log.info("FCM 자동 알림 보내기 동작 시간 : {}", localDateTime);
        notificationService.sendMessageAuto();

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

}
