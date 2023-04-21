package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Tag;
import java.time.LocalDate;
import java.util.List;
import lombok.Getter;

@Getter
public class AddMeetingRequestDto {
    private String title;
    private List<Long> tag;
    private LocalDate startDay;
    private LocalDate endDay;
    private String color;
}
