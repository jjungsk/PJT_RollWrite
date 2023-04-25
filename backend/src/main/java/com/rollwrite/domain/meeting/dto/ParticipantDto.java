package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.user.entity.User;
import lombok.Getter;

@Getter
public class ParticipantDto {

    private final Long userId;
    private final String profileImage;

    public ParticipantDto(Long id, String content) {
        this.userId = id;
        this.profileImage = content;
    }

    public static ParticipantDto of(Participant participant) {
        User user = participant.getUser();
        return new ParticipantDto(user.getId(), user.getProfileImage());
    }
}
