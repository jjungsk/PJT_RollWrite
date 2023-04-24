package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long>,
    ParticipantCustomRepository {

    List<Participant> findByMeeting(Meeting meeting);
}
