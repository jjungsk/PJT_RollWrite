package com.rollwrite.domain.meeting.controller;

import com.rollwrite.domain.meeting.dto.AddMeetingRequestDto;
import com.rollwrite.domain.meeting.dto.AddMeetingResponseDto;
import com.rollwrite.domain.meeting.dto.MeetingCalenderResDto;
import com.rollwrite.domain.meeting.dto.MeetingInProgressResDto;
import com.rollwrite.domain.meeting.dto.MeetingResultDto;
import com.rollwrite.domain.meeting.dto.TagDto;
import com.rollwrite.domain.meeting.service.MeetingService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping()
    public ResponseEntity<ApiResponse> meetingInProgressList() {
        log.info("진행 중인 모임 전체 조회");
        Long userId = 1L;
        List<MeetingInProgressResDto> meetingInProgressResDtoList = meetingService.findMeetingInProgress(
            userId);
        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.GET_MEETING_IN_PROGRESS_SUCCESS,
                meetingInProgressResDtoList),
            HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> addMeeting(
        @RequestBody AddMeetingRequestDto addMeetingRequestDto) throws NoSuchAlgorithmException {
        Long userId = 1L;
        log.info("Meeting 생성" + addMeetingRequestDto.toString());
        AddMeetingResponseDto addMeetingResponseDto = meetingService.addMeeting(userId,
            addMeetingRequestDto);
        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.ADD_MEETING_SUCCESS, addMeetingResponseDto),
            HttpStatus.OK);
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<ApiResponse> meetingCalenderList(@PathVariable Long meetingId) {
        Long userId = 1L;
        log.info("진행 중인 모임 캘린더 조회  meetingId : " + meetingId + " userId : " + userId);

        List<MeetingCalenderResDto> meetingCalenderResDtoList = meetingService.findMeetingCalender(
            userId, meetingId);

        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.GET_MEETING_CALENDER_SUCCESS,
                meetingCalenderResDtoList),
            HttpStatus.OK);
    }

    @PostMapping("/join/{meetingId}")
    public ResponseEntity<ApiResponse> joinMeeting(@PathVariable Long meetingId) {
        Long userId = 1L;
        log.info("Meeting 참여자 추가 meetingId : " + meetingId + " userId : " + userId);
        meetingService.joinMeeting(userId, meetingId);
        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.JOIN_MEETING_SUCCESS),
            HttpStatus.OK);
    }

    @GetMapping("/tag")
    public ResponseEntity<ApiResponse> tagList() {
        log.info("Tag 리스트 가져오기 ");
        List<TagDto> tagDtoList = meetingService.findTag();
        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.GET_TAG_SUCCESS, tagDtoList),
            HttpStatus.OK);
    }

    @GetMapping("/result")
    public ResponseEntity<ApiResponse> meetingResultList(Pageable pageable) {
        Long userId = 1L;
        log.info("내 모임 결과 전체 조회 userId : " + userId + " " + pageable.toString());
        List<MeetingResultDto> meetingResultDtoList = meetingService.findMeetingResult(userId,
            pageable);
        return new ResponseEntity<>(
            ApiResponse.success(SuccessCode.GET_MEETING_RESULT_SUCCESS, meetingResultDtoList),
            HttpStatus.OK);
    }
}