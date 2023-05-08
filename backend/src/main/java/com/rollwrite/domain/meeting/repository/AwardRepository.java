package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Award;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AwardRepository extends JpaRepository<Award, Long>, AwardCustomRepository {


}
