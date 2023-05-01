package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingAwardDetailsDto {
    private final AwardDto award;

    @Builder
    public MeetingAwardDetailsDto(AwardDto award) {
        this.award = award;
    }
}