package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;

import java.util.List;
import java.util.Optional;

public interface MeetingCustomRepository {
    List<Long> findMeetingByToday();

    Optional<Meeting> validMeetingInviteCode(String inviteCode);
}