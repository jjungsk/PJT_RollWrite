package com.rollwrite.domain.meeting.repository;


import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.TagMeeting;

import java.util.List;

public interface TagMeetingCustomRepository {

    List<TagMeeting> findTagMeetingByMeeting(Meeting meeting);

}
