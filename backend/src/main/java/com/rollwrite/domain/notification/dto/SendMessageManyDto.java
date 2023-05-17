package com.rollwrite.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class SendMessageManyDto {
    private String title;
    private String body;
    private String image;
    private List<String> firebaseTokenList;

    @Builder
    public SendMessageManyDto(String setTitle, String setBody, String setImage, List<String> setFirebaseTokenList) {
        this.title = setTitle;
        this.body = setBody;
        this.image = setImage;
        this.firebaseTokenList = setFirebaseTokenList;
    }
}
