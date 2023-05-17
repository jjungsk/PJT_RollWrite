package com.rollwrite.domain.meeting.controller;

import com.rollwrite.domain.meeting.dto.*;
import com.rollwrite.domain.meeting.service.MeetingService;
import com.rollwrite.domain.user.dto.FindUserResDto;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.ErrorCode;
import com.rollwrite.global.model.SuccessCode;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
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

@Api(tags = {"03. Meeting-Controller (모임 관련)"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/meeting")
public class MeetingController {

    private final MeetingService meetingService;

    @ApiOperation(value = "로그인한 사용자가 참여하는 진행 중인 모임 목록을 조회", notes = "로그인한 사용자가 참여하는 진행 중인 모임 목록을 조회")
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

    @ApiOperation(value = "모임 생성", notes = "본인이 생성 하는 모임")
    @PostMapping()
    public ResponseEntity<ApiResponse> addMeeting(@ApiIgnore Authentication authentication,
                                                  @RequestBody AddMeetingReqDto addMeetingReqDto) throws NoSuchAlgorithmException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("Meeting 생성" + addMeetingReqDto.toString());

        AddMeetingResDto addMeetingResDto = meetingService.addMeeting(userId,
                addMeetingReqDto);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.ADD_MEETING_SUCCESS, addMeetingResDto),
                HttpStatus.OK);
    }

    @ApiOperation(value = "캘린더에 표시할 정보들을 조회", notes = "캘린더에 표시할 정보들을 조회")
    @Parameter(name = "meetingId", description = "진행 중인 모임 중 조회 할 모임 아이디")
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

    @ApiOperation(value = "초대 링크", notes = "Meeting 초대 링크 가져오기")
    @Parameter(name = "meetingId", description = "초대 할 미팅 아이디")
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

    @ApiOperation(value = "모임 참여", notes = "초대 링크의 모임 참여")
    @Parameter(name = "inviteCode", description = "초대 링크의 참여 모임 아이디")
    @PostMapping("/join/{inviteCode}")
    public ResponseEntity<ApiResponse> joinMeeting(@ApiIgnore Authentication authentication, @PathVariable String inviteCode) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("Meeting 참여자 추가 userId : " + userId + " inviteCode : " + inviteCode);

        JoinMeetingResDto joinMeetingResDto = meetingService.joinMeeting(userId, inviteCode);

        int flag = joinMeetingResDto.getFlag();
        log.info("Join Meeting flag : " + flag);

        if (flag == 0) {
            return new ResponseEntity<>(
                    ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION, "잘못된 인가코드입니다."),
                    HttpStatus.OK);
        } else if (flag == 1) {
            return new ResponseEntity<>(
                    ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION, "이미 참여한 사용자입니다.", joinMeetingResDto),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(
                    ApiResponse.success(SuccessCode.JOIN_MEETING_SUCCESS, joinMeetingResDto),
                    HttpStatus.OK);
        }
    }


    @ApiOperation(value = "태그 가져오기", notes = "모임 생성 시 태그 가져오기")
    @GetMapping("/tag")
    public ResponseEntity<ApiResponse> tagList() {
        log.info("Tag 리스트 가져오기 ");

        List<TagDto> tagDtoList = meetingService.findTag();

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_TAG_SUCCESS, tagDtoList),
                HttpStatus.OK);
    }

    @ApiOperation(value = "완료한 모임 전체 리스트", notes = "내 완료한 모임 전체 리스트 조회")
    // TODO : pageable 은 태윤이 추가해줘~~
//    @Parameter(name = "파라미터이름과동일", description = "파라미터설명")
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

    @ApiOperation(value = "모임 결과 채팅 상세 조회", notes = "모임 결과 채팅 상세 조회")
    @Parameter(name = "meetingId", description = "조회할 모임 아이디")
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

    @ApiOperation(value = "모임 결과 통계 상세 조회", notes = "모임 결과 통계 상세 조회")
    @Parameter(name = "meetingId", description = "조회 할 모임 아이디")
    @GetMapping("/award/{meetingId}")
    public ResponseEntity<ApiResponse> meetingAwardDetails(@ApiIgnore Authentication authentication, @PathVariable Long meetingId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("모임 결과 통계 상세 조회 userId : " + userId + " meetingId : " + meetingId);

        List<MeetingAwardDto> meetingAwardDtoList = meetingService.findMeetingAward(userId, meetingId);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_MEETING_AWARD_SUCCESS, meetingAwardDtoList),
                HttpStatus.OK);
    }

    @ApiOperation(value = "모임 참여자 전체 조회", notes = "모임 참여자 전체 조회")
    @Parameter(name = "meetingId", description = "조회 할 모임 아이디")
    @GetMapping("/participant/{meetingId}")
    public ResponseEntity<ApiResponse> participantList(@ApiIgnore Authentication authentication, @PathVariable Long meetingId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("모임 참여자 전체 조회 meetingId : " + meetingId + " userId : " + userId);

        List<FindUserResDto> findUserResDtoList = meetingService.findParticipant(userId, meetingId);

        return new ResponseEntity<>(
                ApiResponse.success(SuccessCode.GET_PARTICIPANT_SUCCESS, findUserResDtoList),
                HttpStatus.OK);
    }

    @ApiOperation(value = "point 사용 시, 답변 뽑기", notes = "현재 모임의 답변 뽑기")
    @PostMapping("/answer/random")
    public ResponseEntity<ApiResponse> getRandomAnswer(@ApiIgnore Authentication authentication, @RequestBody MeetingRandomQuestionReqDto meetingRandomQuestionReqDto) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();

        MeetingRandomQuestionResDto meetingRandomQuestionResDto = meetingService.getRandomAnswer(userId, meetingRandomQuestionReqDto);
        if (meetingRandomQuestionResDto == null) {
            return new ResponseEntity<>(ApiResponse.error(ErrorCode.BAD_REQUEST_POINT), HttpStatus.OK);
        }

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.GET_RANDOM_ANSWER_SUCCESS, meetingRandomQuestionResDto), HttpStatus.OK);
    }
}