package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingAwardDto {
    private final AwardDto award;

    @Builder
    public MeetingAwardDto(AwardDto award) {
        this.award = award;
    }
}