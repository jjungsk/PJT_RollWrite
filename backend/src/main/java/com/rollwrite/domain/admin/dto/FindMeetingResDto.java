package com.rollwrite.domain.admin.dto;

import com.rollwrite.domain.meeting.dto.TagDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
public class FindMeetingResDto {
    private final Long meetingId;
    private final String title;
    private final List<TagDto> tag;
    private final LocalDate startDay;
    private final LocalDate endDay;
    private final String color;
    private final String inviteUrl;

    @Builder
    public FindMeetingResDto(Meeting meeting) {
        this.meetingId = meeting.getId();
        this.title = meeting.getTitle();
        this.tag = meeting.getTagMeetingList().stream().map(tagMeeting -> TagDto.of(tagMeeting.getTag())).collect(Collectors.toList());
        this.startDay = meeting.getStartDay();
        this.endDay = meeting.getEndDay();
        this.color = meeting.getColor();
        this.inviteUrl = meeting.getInviteCode();
    }
}
