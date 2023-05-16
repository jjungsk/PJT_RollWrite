package com.rollwrite.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
public class FindMeetingDashboardDto {
    private final LocalDate day;
    private final int meetingCnt;
    private final List<FindMeetingResDto> findMeetingResDtoList;

    @Builder
    public FindMeetingDashboardDto(LocalDate day, int meetingCnt, List<FindMeetingResDto> findMeetingResDtoList) {
        this.day = day;
        this.meetingCnt = meetingCnt;
        this.findMeetingResDtoList = findMeetingResDtoList;
    }
}
