package com.rollwrite.domain.meeting.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MeetingAwardDto {
    private List<AwardUserDto> taleteller = new ArrayList<>();
    private List<AwardUserDto> photographer = new ArrayList<>();
    private List<AwardUserDto> perfectAttendance = new ArrayList<>();

    public void addTaleteller(AwardUserDto awardUserDto) {
        taleteller.add(awardUserDto);
    }

    public void addPhotographer(AwardUserDto awardUserDto) {
        photographer.add(awardUserDto);
    }

    public void addPerfectAttendance(AwardUserDto awardUserDto) {
        perfectAttendance.add(awardUserDto);
    }
}