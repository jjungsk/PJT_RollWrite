package com.rollwrite.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;

@Getter
@ToString
public class SendMessageAllDto {
    private HashMap<Long, List<Long>> userIdAndMeetingList;
    private HashMap<Long, String> userIdAndNickname;
    private HashMap<Long, String> userIdAndToken;
    private HashMap<Long, String> meetingIdAndTitle;

    @Builder
    public SendMessageAllDto(HashMap<Long, List<Long>> setUserIdAndMeetingList, HashMap<Long, String> setUserIdAndNickname
                             ,HashMap<Long, String> setUserIdAndToken, HashMap<Long, String> setMeetingIdAndTitle) {
        this.userIdAndMeetingList = setUserIdAndMeetingList;
        this.userIdAndNickname = setUserIdAndNickname;
        this.userIdAndToken = setUserIdAndToken;
        this.meetingIdAndTitle = setMeetingIdAndTitle;
    }
}
