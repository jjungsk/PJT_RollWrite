package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {



}
