package com.rollwrite.domain.question.dto;

import com.rollwrite.domain.meeting.entity.Participant;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AddAnswerResDto {
    private final Long meetingId;
    private final Boolean isDone;

    @Builder
    public AddAnswerResDto(Participant participant) {
        this.meetingId = participant.getMeeting().getId();
        this.isDone = participant.isDone();
    }
}