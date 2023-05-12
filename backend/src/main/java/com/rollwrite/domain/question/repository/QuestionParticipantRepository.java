package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import com.rollwrite.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionParticipantRepository extends JpaRepository<QuestionParticipant, Long>, QuestionParticipantCustomRepository {
    Long countByUserAndMeeting(User user, Meeting meeting);
}