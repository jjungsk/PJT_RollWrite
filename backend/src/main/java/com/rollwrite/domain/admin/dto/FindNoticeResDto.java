package com.rollwrite.domain.admin.dto;

import com.rollwrite.domain.notification.entity.Notification;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class FindNoticeResDto {
    private final Long noticeId;
    private final String content;
    private final LocalDateTime createdAt;

    @Builder
    public FindNoticeResDto(Notification notification) {
        this.noticeId = notification.getId();
        this.content = notification.getContent();
        this.createdAt = notification.getCreatedAt();
    }
}
