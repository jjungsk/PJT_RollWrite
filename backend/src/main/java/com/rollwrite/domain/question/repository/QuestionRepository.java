package com.rollwrite.domain.question.repository;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionCustomRepository {

    List<Question> findByMeeting(Meeting meeting);

    List<Question> findAllByMeeting(Meeting meeting);
}