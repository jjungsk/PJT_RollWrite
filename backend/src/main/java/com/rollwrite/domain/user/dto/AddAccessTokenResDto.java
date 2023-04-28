package com.rollwrite.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddAccessTokenResDto {
    private final String accessToken;

    @Builder
    public AddAccessTokenResDto(String accessToken) {
        this.accessToken = accessToken;
    }

}
