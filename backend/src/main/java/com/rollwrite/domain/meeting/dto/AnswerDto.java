package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class AnswerDto {
    private final String nickname;
    private final String profileImage;
    private final Boolean isMe;
    private final String content;
    private final LocalDateTime time;

    @Builder
    public AnswerDto(String nickname, String profileImage, String content, LocalDateTime time, Long myId, Long userId) {
        if (myId == userId) {
            this.isMe = true;
        } else {
            this.isMe = false;
        }
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.content = content;
        this.time = time;
    }
}
