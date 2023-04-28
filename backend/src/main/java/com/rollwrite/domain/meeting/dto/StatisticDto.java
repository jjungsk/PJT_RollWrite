package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class StatisticDto {
    private List<StatisticUserDto> taleteller = new ArrayList<>();
    private List<StatisticUserDto> photographer = new ArrayList<>();
    private List<StatisticUserDto> proGagler = new ArrayList<>();

    public void addTaleteller(StatisticUserDto statisticUserDto) {
        taleteller.add(statisticUserDto);
    }

    public void addPhotographer(StatisticUserDto statisticUserDto) {
        photographer.add(statisticUserDto);
    }

    public void addProGagler(StatisticUserDto statisticUserDto) {
        proGagler.add(statisticUserDto);
    }
}