package com.rollwrite.domain.notification.controller;

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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@Api(tags = {"05. Notification-Controller (FCM, 공지 관련)"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final FcmService fcmService;
    private final NotificationService notificationService;

    @ApiOperation(value = "FCM 토큰 저장", notes = "알림 허용 유저에 한해 Token은 DB에 저장")
    @Parameter(name = "firebaseToekn", description = "FCM에서 받은 유저의 Token")
    @PutMapping("/token/{firebaseToken}")
    public ResponseEntity<ApiResponse<?>> updateFirebaseToken(@ApiIgnore Authentication authentication, @PathVariable String firebaseToken) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();

        notificationService.updateFirebaseToken(userId,firebaseToken);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_FCM_TOKEN_SUCCESS), HttpStatus.OK);
    }

    @ApiOperation(value = "(개인) FCM 알림 보내기", notes = "Token 한개에 알람 보내기")
    @Parameter(name = "firebaseToekn", description = "FCM에서 받은 유저의 Token")
    @PostMapping("/individual")
    public ResponseEntity<ApiResponse<?>> sendMessageTo(String targetToken, String title, String body) throws IOException {

        fcmService.sendMessageTo(targetToken, title, body);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.SEND_MESSAGE_TO), HttpStatus.OK);
    }
}
