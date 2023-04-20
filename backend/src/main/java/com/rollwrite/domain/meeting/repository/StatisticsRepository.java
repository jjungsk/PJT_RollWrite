package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Long> {



}
