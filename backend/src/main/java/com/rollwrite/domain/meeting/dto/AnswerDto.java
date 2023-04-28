package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class AnswerDto {
    private String nickname;
    private String profileImage;
    private Boolean isMe;
    private String content;
    private LocalDateTime time;

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
