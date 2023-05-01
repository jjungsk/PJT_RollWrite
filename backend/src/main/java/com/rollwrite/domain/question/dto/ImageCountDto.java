package com.rollwrite.domain.question.dto;

import com.rollwrite.domain.user.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class ImageCountDto {
    private final User user;
    private final Long imageCount;
}