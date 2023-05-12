package com.rollwrite.global.model.chatgpt;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@ToString
public class ChatGPTResDto {
    private String id;
    private String object;
    private String model;
    private LocalDate created;
    private List<ChoiceDto> choices;
    private UsageDto usage;
}
