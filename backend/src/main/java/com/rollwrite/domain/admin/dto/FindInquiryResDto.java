package com.rollwrite.domain.admin.dto;

import com.rollwrite.domain.inquiry.entity.Inquiry;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class FindInquiryResDto {
    private final Long inquiryId;
    private final String content;
    private final String imageUrl;
    private final LocalDateTime createdAt;
    private final String userNickname;
    private final String userProfileImage;

    @Builder
    public FindInquiryResDto(Inquiry inquiry) {
        this.inquiryId = inquiry.getId();
        this.content = inquiry.getContent();
        this.imageUrl = inquiry.getImageUrl();
        this.createdAt = inquiry.getCreatedAt();
        this.userNickname = inquiry.getUser().getNickname();
        this.userProfileImage = inquiry.getUser().getProfileImage();
    }
}
