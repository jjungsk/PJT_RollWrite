package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Tag;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AddMeetingResponseDto {
    private final String title;
    private final List<Tag> tag;
    private final LocalDate startDay;
    private final LocalDate endDay;
    private final String color;
    private final String inviteUrl;

    @Builder
    public AddMeetingResponseDto(Meeting meeting, String inviteUrl, List<Tag> tag) {
        this.title = meeting.getTitle();
        this.tag = tag;
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.inviteUrl = inviteUrl;
    }
}
