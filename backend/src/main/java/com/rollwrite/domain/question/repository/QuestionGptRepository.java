package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.question.entity.QuestionGpt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionGptRepository extends JpaRepository<QuestionGpt, Long>, QuestionGptCustomRepository {
}