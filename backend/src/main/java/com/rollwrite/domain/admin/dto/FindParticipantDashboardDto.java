package com.rollwrite.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class FindParticipantDashboardDto {
    private final int meetingCnt;
    private final List<FindUserResDto> findUserResDtoList;

    @Builder
    public FindParticipantDashboardDto(int meetingCnt, List<FindUserResDto> findUserResDtoList) {
        this.meetingCnt = meetingCnt;
        this.findUserResDtoList = findUserResDtoList;
    }
}
