package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Participant;
import java.util.List;
import java.util.Optional;

public interface ParticipantCustomRepository {

    List<Participant> findParticipantByUser(Long userId);

    List<Meeting> findMeetingByUserAndIsDone(Long userId, boolean isDone);

    Optional<Meeting> findMeetingByUserAndMeetingAndIsDone(Long userId, Long meetingId, boolean isDone);

}
