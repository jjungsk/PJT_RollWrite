package com.rollwrite.domain.notification.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class SendMessageOneReqDto {
    private final String title;
    private final String body;
    private final String image;
    private final String firebaseToken;
}
