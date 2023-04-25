package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantCustomRepository {
    List<Meeting> findMeetingByUser(Long userId);
}