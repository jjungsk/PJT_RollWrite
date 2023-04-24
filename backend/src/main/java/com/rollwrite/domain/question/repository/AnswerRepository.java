package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findByUserAndQuestion(User user, Question question);
}