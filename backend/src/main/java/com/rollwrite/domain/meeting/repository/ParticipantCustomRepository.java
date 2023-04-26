package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

public interface ParticipantCustomRepository {

    List<Meeting> findMeetingByUserAndIsDone(Long userId, boolean isDone);

    List<Meeting> findFinisihedMeetingByUserAndIsDone(Long userId, Pageable pageable);

    Optional<Meeting> findMeetingByUserAndMeetingAndIsDone(Long userId, Long meetingId,
        boolean isDone);

}
