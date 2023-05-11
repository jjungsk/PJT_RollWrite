package com.rollwrite.domain.notice.dto;

import com.rollwrite.domain.notice.entity.Notice;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class FindNoticeResDto {
    private final Long noticeId;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;

    @Builder
    public FindNoticeResDto(Notice notice) {
        this.noticeId = notice.getId();
        this.title = notice.getTitle();
        this.content = notice.getContent();
        this.createdAt = notice.getCreatedAt();
    }
}
