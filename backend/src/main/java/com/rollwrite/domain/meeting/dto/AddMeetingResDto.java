package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Meeting;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AddMeetingResDto {

    private final String title;
    private final List<TagDto> tag;
    private final LocalDate startDay;
    private final LocalDate endDay;
    private final String color;
    private final String inviteUrl;

    @Builder
    public AddMeetingResDto(Meeting meeting, String inviteUrl, List<TagDto> tag) {
        this.title = meeting.getTitle();
        this.tag = tag;
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.inviteUrl = inviteUrl;
    }
}
