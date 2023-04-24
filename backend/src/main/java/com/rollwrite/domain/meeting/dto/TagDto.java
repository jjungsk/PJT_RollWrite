package com.rollwrite.domain.meeting.dto;

import com.rollwrite.domain.meeting.entity.Tag;
import lombok.Getter;

@Getter
public class TagDto {

    private final Long id;
    private final String content;

    public TagDto(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public static TagDto of(Tag tag) {
        return new TagDto(tag.getId(), tag.getContent());
    }
}
