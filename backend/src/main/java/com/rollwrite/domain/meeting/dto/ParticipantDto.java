package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.user.entity.User;
import lombok.Getter;

@Getter
public class ParticipantDto {

    private final Long userId;
    private final String profileImage;
    private final String nickname;

    public ParticipantDto(Long id, String content, String nickname) {
        this.userId = id;
        this.profileImage = content;
        this.nickname = nickname;
    }

    public static ParticipantDto of(Participant participant) {
        User user = participant.getUser();
        return new ParticipantDto(user.getId(), user.getProfileImage(), user.getNickname());
    }
}
