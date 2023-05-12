package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.admin.dto.MeetingCountDto;
import com.rollwrite.domain.meeting.entity.Meeting;

import java.util.List;
import java.util.Optional;

import com.rollwrite.domain.meeting.entity.Participant;
import org.springframework.data.domain.Pageable;

public interface ParticipantCustomRepository {

    List<Meeting> findMeetingByUserAndIsDone(Long userId, boolean isDone);

    List<Meeting> findFinisihedMeetingByUser(Long userId, Pageable pageable);

    Optional<Meeting> findMeetingByUserAndMeetingAndIsDone(Long userId, Long meetingId,
                                                           boolean isDone);

    List<Participant> findMeetingAndUserAndTitleByProgress(boolean isDone);

    Optional<Participant> findParticipantByUserAndMeetingAndIsDone(Long userId, Long meetingId, boolean isDone);

    List<MeetingCountDto> findMeetingCnt();

}