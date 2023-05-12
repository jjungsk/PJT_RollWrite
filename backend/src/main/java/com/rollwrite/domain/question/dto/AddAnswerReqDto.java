package com.rollwrite.domain.question.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Schema(description = "사용자가 모임에 생성 할 답변 DTO")
@Getter
@ToString
@RequiredArgsConstructor
public class AddAnswerReqDto {
    @Schema(description = "모임 아이디", type = "Long")
    private final Long meetingId;
    @Schema(description = "질문 아이디", type = "Long")
    private final Long questionId;
    @Schema(description = "모임 아이디", type = "String", example = "테스트 답변 입니다~!")
    private final String answer;
}