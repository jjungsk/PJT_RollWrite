package com.rollwrite.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
public class SendMessageOneDto {
    private String title;
    private String body;
    private String image;
    private String firebaseToken;

    @Builder
    public SendMessageOneDto(String setTitle, String setBody, String setImage, String setFirebaseToken) {
        this.title = setTitle;
        this.body = setBody;
        this.image = setImage;
        this.firebaseToken = setFirebaseToken;
    }
}
