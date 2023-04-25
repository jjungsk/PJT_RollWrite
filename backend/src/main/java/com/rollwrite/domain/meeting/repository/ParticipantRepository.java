package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long>, ParticipantCustomRepository {
}