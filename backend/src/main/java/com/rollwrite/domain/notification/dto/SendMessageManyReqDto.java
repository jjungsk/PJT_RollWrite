package com.rollwrite.domain.notification.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@RequiredArgsConstructor
public class SendMessageManyReqDto {
    private final String title;
    private final String body;
    private final String image;
    private final List<String> firebaseTokenList;
}
