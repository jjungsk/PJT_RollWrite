package com.rollwrite.domain.inquiry.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Schema(description = "사용자가 생성 할 문의 DTO")
@Getter
@ToString
@RequiredArgsConstructor
public class AddInquiryReqDto {
    @Schema(description = "문의 내용", type = "String", example = "문의 내용입니다~!")
    private String inquiry;
}
