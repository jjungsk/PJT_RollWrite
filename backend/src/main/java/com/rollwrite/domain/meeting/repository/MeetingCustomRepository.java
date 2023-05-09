package com.rollwrite.domain.meeting.repository;

import java.util.List;

public interface MeetingCustomRepository {
    List<Long> findMeetingByToday();
}