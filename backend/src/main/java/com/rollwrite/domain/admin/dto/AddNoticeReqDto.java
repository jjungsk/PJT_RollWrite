package com.rollwrite.domain.admin.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class AddNoticeReqDto {
    private final String title;
    private final String content;
}
