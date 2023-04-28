package com.rollwrite.global.model.chatgpt;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ChoiceDto {
    private Integer index;
    private MessageDto message;
    @JsonProperty("finish_reason")
    private String finishReason;
}