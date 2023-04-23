package com.rollwrite.domain.meeting.repository;

import com.rollwrite.domain.meeting.entity.TagMeeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagMeetingRepository extends JpaRepository<TagMeeting, Long> {

}
