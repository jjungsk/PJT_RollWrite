package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Tag;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AddMeetingResponseDto {
    private String title;
    private List<Tag> tag;
    private LocalDate startDay;
    private LocalDate endDay;
    private String color;
    private String inviteUrl;

    @Builder
    public AddMeetingResponseDto(Meeting meeting, String inviteUrl) {
        this.title = meeting.getTitle();
//        this.tag = meeting.getTagList();
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.inviteUrl = inviteUrl;
    }
}
