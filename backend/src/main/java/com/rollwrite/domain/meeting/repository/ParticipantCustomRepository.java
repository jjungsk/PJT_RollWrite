package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.user.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantCustomRepository {
    List<Meeting> findMeetingByUser(User user);
}