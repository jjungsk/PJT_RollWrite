package com.rollwrite.global.model.Fcm;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class FcmMessageManyDto {
    private boolean validateOnly;
    private Message message;


    @Getter
    @Builder
    @AllArgsConstructor
    public static class Message {
        private ArrayList<String> registration_ids;
//        private Data data;
        private Notification notification; // 모든 mobile od
    }

//    @Getter
//    @Builder
//    @AllArgsConstructor
//    public static class Data {
//        private String Nick;
//        private String Room;
//    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Notification {
        private String title;
        private String body;
//        private String image;
    }

}
