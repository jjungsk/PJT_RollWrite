package com.rollwrite.domain.meeting.controller;

import com.rollwrite.domain.meeting.dto.*;
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

    @GetMapping("/join/{meetingId}")
    public ResponseEntity<ApiResponse> getMeetingInviteUrl(@PathVariable Long meetingId) {
        Long userId = 1L;
        log.info("Meeting 초대 링크 가져오기 meetingId : " + meetingId + " userId : " + userId);
        MeetingInviteUrlDto meetingInviteUrlDto = meetingService.findMeetingInviteUrl(meetingId);
        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_INVITE_URL_SUCCESS, meetingInviteUrlDto),
                HttpStatus.OK);
    }

    @PostMapping("/join/{inviteCode}/{userId}")
    public ResponseEntity<ApiResponse> joinMeeting(@PathVariable String inviteCode,@PathVariable Long userId) {
        // TODO: Test하기 위해 직접  userId 입력 받음 (후에 userId는 삭제 예정)
        log.info("Meeting 참여자 추가 userId : " + userId + " inviteCode : " + inviteCode);
        meetingService.joinMeeting(userId, inviteCode);
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
        log.info("내 완료한 모임 전체 리스트 조회 userId : " + userId + " " + pageable.toString());
        List<MeetingResultDto> meetingResultDtoList = meetingService.findMeetingResultList(userId,
                pageable);
        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_RESULT_SUCCESS, meetingResultDtoList),
                HttpStatus.OK);
    }


    @GetMapping("/result/{meetingId}")
    public ResponseEntity<ApiResponse> meetingResultDetails(Long meetingId) {
        Long userId = 1L;
        log.info("내 모임 결과 전체 조회 userId : " + userId + " meetingId : " + meetingId);
        MeetingResultDetailsDto meetingResultDetailsDto = meetingService.findMeetingResult(userId, meetingId);
        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_RESULT_SUCCESS, meetingResultDetailsDto),
                HttpStatus.OK);
    }
}