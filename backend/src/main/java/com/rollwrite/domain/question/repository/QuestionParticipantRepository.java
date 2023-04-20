package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.question.entity.QuestionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionParticipantRepository extends JpaRepository<QuestionParticipant, Long> {
}
