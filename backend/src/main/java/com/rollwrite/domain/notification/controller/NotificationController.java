package com.rollwrite.domain.notification.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.rollwrite.domain.notification.dto.AddFcmTokenReqDto;
import com.rollwrite.domain.notification.dto.SendMessageManyDto;
import com.rollwrite.domain.notification.dto.SendMessageOneDto;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Api(tags = {"06. Notification-Controller (FCM, 공지 관련)"})
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
    @PutMapping("/token")
    public ResponseEntity<ApiResponse<?>> addFirebaseToken(@ApiIgnore Authentication authentication, @RequestBody AddFcmTokenReqDto addFcmTokenReqDto) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("FCM Token 저장 : {}", addFcmTokenReqDto.getFirebaseToken());

        notificationService.addFirebaseToken(userId, addFcmTokenReqDto.getFirebaseToken());

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_FCM_TOKEN_SUCCESS), HttpStatus.OK);
    }

    // 2. FCM 알림 보내기 send - 개인
    @ApiOperation(value = "(개인) FCM 알림 보내기", notes = "Token 한개에 알람 보내기")
    @Parameter(name = "firebaseToken", description = "FCM에서 받은 유저의 Token")
    @PostMapping("/individual")
    public ResponseEntity<ApiResponse<?>> sendMessageOne(@ApiIgnore Authentication authentication,
                                                         @RequestBody SendMessageOneDto sendMessageOneDto) throws FirebaseMessagingException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();

        notificationService.sendMessageOne(sendMessageOneDto);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // 3. FCM 알림 보내기 sendMulticast - 다수 (한번에 최대 1000명)
    @ApiOperation(value = "(다수) FCM 알림 보내기", notes = "ArrayList<String> 알람 보내기")
    @Parameter(name = "firebaseToken", description = "알림 보낼 Token List")
    @PostMapping("/multi")
    public ResponseEntity<ApiResponse<?>> sendMessageMany(@ApiIgnore Authentication authentication,
                                                          @RequestBody SendMessageManyDto sendMessageManyDto) throws FirebaseMessagingException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();

        notificationService.sendMessageMany(sendMessageManyDto);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // 4. FCM 알림 보내기 sendAll - 자동 알림 보내기 Main
    @Scheduled(cron = "0 10 8 * * *") // sec min hour(24) day month dayOfWeek(ex.MON-FRI)
    @ApiOperation(value = "(자동) FCM 알림 보내기", notes = "오전 8시 10분 질문 생성 알람 보내기")
    @Parameter(name = "firebaseToken", description = "알림 보낼 Token List")
    @PostMapping("/auto")
    public ResponseEntity<ApiResponse<?>> sendMessageAuto() throws FirebaseMessagingException {
        LocalDateTime localDateTime = LocalDateTime.now();
        log.info("FCM 자동 알림 보내기 동작 시간 : {}", localDateTime);
        notificationService.sendMessageAuto();

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // *. Topic 구독
    @ApiOperation(value = "Topic 구독")
    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<?>> subscribe(@ApiIgnore Authentication authentication,
                                                    @RequestParam("topic") String topic, @RequestParam("token") String token) throws FirebaseMessagingException {
        List<String> tokenList = new ArrayList<>();
        tokenList.add(token);
        fcmService.subscribeTopic(tokenList, topic);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // *. Topic 구독 취소
    @ApiOperation(value = "Topic 구독 취소")
    @DeleteMapping("/unsubscribe")
    public ResponseEntity<ApiResponse<?>> unSubscribe(@ApiIgnore Authentication authentication,
                                                      @RequestParam("topic") String topic, @RequestParam("token") String token) throws FirebaseMessagingException {
        List<String> tokenList = new ArrayList<>();
        tokenList.add(token);
        fcmService.subscribeTopic(tokenList, topic);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

    // *. Topic 메시지 보내기
    @ApiOperation(value = "Topic 구독 메시지 보내기")
    @PostMapping("/topic")
    public ResponseEntity<ApiResponse<?>> sendMessageTopic(@ApiIgnore Authentication authentication,
                                                           @RequestParam("topic") String topic, @RequestParam("token") String token) throws FirebaseMessagingException {
        List<String> tokenList = new ArrayList<>();

        tokenList.add(token);
        fcmService.subscribeTopic(tokenList, topic);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }

}
