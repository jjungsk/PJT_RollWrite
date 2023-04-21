package com.rollwrite.domain.meeting.controller;

import com.rollwrite.domain.meeting.dto.AddMeetingRequestDto;
import com.rollwrite.domain.meeting.dto.AddMeetingResponseDto;
import com.rollwrite.domain.meeting.service.MeetingService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping()
    public ResponseEntity<ApiResponse> addMeeting(
        @RequestBody AddMeetingRequestDto addMeetingRequestDto) {
        Long userId = 1L;
        log.info("Meeting 생성");
        AddMeetingResponseDto addMeetingResponseDto = meetingService.addMeeting(userId,
            addMeetingRequestDto);
        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.ADD_MEETING_SUCCESS, addMeetingResponseDto),
            HttpStatus.OK);
    }
}