package com.rollwrite.domain.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Schema(description = "기기별 FCM Token DTO")
@Getter
@ToString
@RequiredArgsConstructor
public class AddFcmTokenReqDto {
    private String firebaseToken;
}
