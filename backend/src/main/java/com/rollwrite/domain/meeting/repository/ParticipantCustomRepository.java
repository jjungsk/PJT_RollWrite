package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import java.util.List;
import java.util.Optional;

public interface ParticipantCustomRepository {

    List<Meeting> findMeetingByUserAndIsDone(Long userId, boolean isDone);

    Optional<Meeting> findMeetingByUserAndMeetingAndIsDone(Long userId, Long meetingId,
        boolean isDone);

}
