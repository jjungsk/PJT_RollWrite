package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Schema(description = "모임 생성 정보 DTO")
@Getter
@ToString
@RequiredArgsConstructor
public class AddMeetingRequestDto {

    @Schema(description = "모임 제목", type = "String", example = "Test 모임 제목")
    private final String title;
    @Schema(description = "모임 설명(태그 배열), 태그 id값만 보내주기", type = "List<Long>", example = "[1,2,3,5,8]")
    private final List<Long> tag;
    @Schema(description = "모임 시작일", type = "Datetime", example = "2023-05-29")
    private final LocalDate startDay;
    @Schema(description = "모임 종료일", type = "Datetime", example = "2023-06-10")
    private final LocalDate endDay;
    @Schema(description = "모임 테마 색상", type = "String", example = "#FFADXW")
    private final String color;
}
