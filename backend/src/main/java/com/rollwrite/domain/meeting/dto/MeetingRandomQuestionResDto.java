package com.rollwrite.domain.meeting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@ToString
public class MeetingRandomQuestionResDto {

    private String answer;
    private String imageUrl;

    @Builder
    public MeetingRandomQuestionResDto(String setAnswer, String setImageUrl) {
        this.answer = setAnswer;
        this.imageUrl = setImageUrl;
    }
}
