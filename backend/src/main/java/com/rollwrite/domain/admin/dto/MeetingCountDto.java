package com.rollwrite.domain.admin.dto;

import com.rollwrite.domain.user.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class MeetingCountDto {
    private final User user;
    private final Long meetingCount;
}
