package com.rollwrite.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
public class FindUserDashboardDto {
    private final LocalDate day;
    private final int userCnt;
    private final List<FindUserResDto> findUserResDtoList;

    @Builder
    public FindUserDashboardDto(LocalDate day, int userCnt, List<FindUserResDto> findUserResDtoList) {
        this.day = day;
        this.userCnt = userCnt;
        this.findUserResDtoList = findUserResDtoList;
    }
}
