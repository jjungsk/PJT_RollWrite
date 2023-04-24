package com.rollwrite.domain.meeting.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddMeetingRequestDto {

    private String title;
    private List<Long> tag;
    private LocalDate startDay;
    private LocalDate endDay;
    private String color;
}
