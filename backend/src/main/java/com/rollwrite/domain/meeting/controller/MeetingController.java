package com.rollwrite.domain.meeting.controller;

import com.rollwrite.domain.meeting.dto.*;
import com.rollwrite.domain.meeting.service.MeetingService;
import com.rollwrite.domain.user.dto.FindUserResDto;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MeetingService meetingService;

    @GetMapping()
    public ResponseEntity<ApiResponse> meetingInProgressList(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("진행 중인 모임 전체 조회 userId : " + userId);

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
    public ResponseEntity<ApiResponse> meetingCalenderList(@ApiIgnore Authentication authentication, @PathVariable Long meetingId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("진행 중인 모임 캘린더 조회  meetingId : " + meetingId + " userId : " + userId);

        List<MeetingCalenderResDto> meetingCalenderResDtoList = meetingService.findMeetingCalender(
                userId, meetingId);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_CALENDER_SUCCESS,
                        meetingCalenderResDtoList),
                HttpStatus.OK);
    }

    @GetMapping("/join/{meetingId}")
    public ResponseEntity<ApiResponse> getMeetingInviteUrl(@ApiIgnore Authentication authentication, @PathVariable Long meetingId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("Meeting 초대 링크 가져오기 meetingId : " + meetingId + " userId : " + userId);

        MeetingInviteUrlDto meetingInviteUrlDto = meetingService.findMeetingInviteUrl(meetingId);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_INVITE_URL_SUCCESS, meetingInviteUrlDto),
                HttpStatus.OK);
    }

    @PostMapping("/join/{inviteCode}")
    public ResponseEntity<ApiResponse> joinMeeting(@ApiIgnore Authentication authentication, @PathVariable String inviteCode) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
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
    public ResponseEntity<ApiResponse> meetingResultList(@ApiIgnore Authentication authentication, Pageable pageable) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("내 완료한 모임 전체 리스트 조회 userId : " + userId + " " + pageable.toString());

        List<MeetingResultDto> meetingResultDtoList = meetingService.findMeetingResultList(userId,
                pageable);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_RESULT_SUCCESS, meetingResultDtoList),
                HttpStatus.OK);
    }

    @GetMapping("/chat/{meetingId}")
    public ResponseEntity<ApiResponse> meetingChatDetails(@ApiIgnore Authentication authentication, @PathVariable Long meetingId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("모임 결과 채팅 상세 조회 userId : " + userId + " meetingId : " + meetingId);

        MeetingChatDto meetingChatDto = meetingService.findMeetingChat(userId, meetingId);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_CHAT_SUCCESS, meetingChatDto),
                HttpStatus.OK);
    }

    @GetMapping("/award/{meetingId}")
    public ResponseEntity<ApiResponse> meetingAwardDetails(@PathVariable Long meetingId) {
        log.info("모임 결과 통계 상세 조회  meetingId : " + meetingId);

        List<MeetingAwardDto> meetingAwardDtoList = meetingService.findMeetingAward(meetingId);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_AWARD_SUCCESS, meetingAwardDtoList),
                HttpStatus.OK);
    }

    @GetMapping("/participant/{meetingId}")
    public ResponseEntity<ApiResponse> participantList(@PathVariable Long meetingId) {
        log.info("모임 참여자 전체 조회 meetingId : " + meetingId);
        List<FindUserResDto> findUserResDtoList = meetingService.findParticipant(1L, meetingId);
        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_PARTICIPANT_SUCCESS, findUserResDtoList),
                HttpStatus.OK);
    }
}