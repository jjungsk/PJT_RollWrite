package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class AddMeetingRequestDto {

    private final String title;
    private final List<Long> tag;
    private final LocalDate startDay;
    private final LocalDate endDay;
    private final String color;
}
