package com.rollwrite.domain.meeting.repository;


import com.rollwrite.domain.meeting.dto.MeetingAwardDto;
import com.rollwrite.domain.meeting.entity.Meeting;

import java.util.List;

public interface AwardCustomRepository {
    List<MeetingAwardDto> findAwardUser(Meeting meeting);
}
