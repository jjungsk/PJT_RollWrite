package com.rollwrite.domain.meeting.repository;


import com.rollwrite.domain.meeting.dto.StatisticUserDto;
import com.rollwrite.domain.meeting.entity.Meeting;

import java.util.List;

public interface StatisticsCustomRepository {
    List<StatisticUserDto> findStatisticUser(Meeting meeting);
}
