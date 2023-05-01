package com.rollwrite.global.model.Fcm;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FcmNotificationReqDto {
    private final Long targetUserId;
    private final String title;
    private final String body;

    @Builder
    public FcmNotificationReqDto(Long targetUserId, String title, String body) {
        this.targetUserId = targetUserId;
        this.title = title;
        this.body = body;
    }
}
