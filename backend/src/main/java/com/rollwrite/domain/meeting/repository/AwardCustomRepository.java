package com.rollwrite.domain.meeting.repository;


import com.rollwrite.domain.meeting.dto.AwardUserDto;
import com.rollwrite.domain.meeting.entity.Meeting;

import java.util.List;

public interface AwardCustomRepository {
    List<AwardUserDto> findAwardUser(Meeting meeting);
}
