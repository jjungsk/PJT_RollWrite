package com.rollwrite.domain.admin.dto;

import com.rollwrite.domain.meeting.entity.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FindTagResDto {
    private final Long tagId;
    private final String content;

    @Builder
    public FindTagResDto(Tag tag) {
        this.tagId = tag.getId();
        this.content = tag.getContent();
    }
}
