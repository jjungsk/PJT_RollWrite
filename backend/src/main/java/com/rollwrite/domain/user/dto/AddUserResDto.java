package com.rollwrite.domain.user.dto;

import lombok.*;

@Getter
@ToString
@Builder
public class AddUserResDto {
    private final String nickname;
    private final String profileImage;
}
