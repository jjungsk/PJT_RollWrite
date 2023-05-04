package com.rollwrite.domain.question.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Schema(description = "사용자가 모임에 생성 할 질문 DTO")
@Getter
@ToString
@RequiredArgsConstructor
public class AddQuestionReqDto {
    @Schema(description = "모임 아이디", type = "Long")
    private final Long meetingId;
    @Schema(description = "모임 아이디", type = "Long", example = "테스트 질문 입니다~!")
    private final String question;
}