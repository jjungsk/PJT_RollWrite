package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.StatisticsType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StatisticUserDto {
    private final Long userId;
    private final String nickname;
    private final String profileImage;
    private final StatisticsType statisticsType;

    @Builder
    public StatisticUserDto(Long userId, String nickname, String profileImage, StatisticsType statisticsType) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.statisticsType = statisticsType;
    }
}
