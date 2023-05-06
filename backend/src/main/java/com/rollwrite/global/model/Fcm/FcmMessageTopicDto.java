package com.rollwrite.global.model.Fcm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class FcmMessageTopicDto {

    private Message message;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Message {
        private String topic;
        private Notification notification; // 모든 mobile od
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Notification {
        private String title;
        private String body;
    }

}
