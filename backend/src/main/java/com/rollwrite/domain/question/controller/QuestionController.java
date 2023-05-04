package com.rollwrite.domain.question.controller;

import com.rollwrite.domain.question.dto.*;
import com.rollwrite.domain.question.service.QuestionService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags = {"04. Question-Controller (질문 관련)"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QuestionController {

    private final Job job;
    private final JobLauncher jobLauncher;
    private final QuestionService questionService;

    @ApiOperation(value = "사용자 질문 생성", notes = "사용자 질문 생성")
    @PostMapping
    public ResponseEntity<ApiResponse> addQuestion(@ApiIgnore Authentication authentication,
                                                   @RequestBody AddQuestionReqDto addQuestionReqDto) {
        log.info("사용자 질문 생성 addQuestionReqDto : {}", addQuestionReqDto);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        questionService.addQuestion(userId, addQuestionReqDto);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_QUESTION_SUCCESS), HttpStatus.OK);
    }

    @ApiOperation(value = "질문 답변 생성", notes = "질문 답변 생성")
    @Parameter(name = "image", description = "답변에 등록할 이미지")
    @PostMapping("/answer")
    public ResponseEntity<ApiResponse<AddAnswerResDto>> addAnswer(@ApiIgnore Authentication authentication,
                                                                  @RequestPart AddAnswerReqDto addAnswerReqDto,
                                                                  @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("답변 생성 addAnswerReqDto : {}", addAnswerReqDto);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        AddAnswerResDto addAnswerResDto = questionService.addAnswer(userId, addAnswerReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_ANSWER_SUCCESS, addAnswerResDto), HttpStatus.OK);
    }

    @ApiOperation(value = "답변 수정", notes = "답변 수정")
    @Parameter(name = "image", description = "수정 할 답변 이미지")
    @PutMapping("/answer")
    public ResponseEntity<ApiResponse> modifyAnswer(@ApiIgnore Authentication authentication,
                                                    @RequestPart ModifyAnswerReqDto modifyAnswerReqDto,
                                                    @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("답변 수정 modifyAnswerReqDto : {}", modifyAnswerReqDto);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        questionService.modifyAnswer(userId, modifyAnswerReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_ANSWER_SUCCESS), HttpStatus.OK);
    }

    @ApiOperation(value = "답변 이미지 삭제", notes = "답변 이미지 삭제")
    @Parameter(name = "questionId", description = "삭제할 답변 이미지의 질문 아이디")
    @DeleteMapping("/answer/{questionId}")
    public ResponseEntity<ApiResponse> removeAnswerImage(@ApiIgnore Authentication authentication,
                                                         @PathVariable Long questionId) throws IOException {
        log.info("답변 이미지 삭제 questionId : {}", questionId);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        questionService.removeAnswerImage(userId, questionId);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.REMOVE_ANSWER_IMAGE_SUCCESS), HttpStatus.OK);
    }

    @ApiOperation(value = "진행 중인 모임 캘린더", notes = "로그인한 사용자가 참여하는 진행 중인 모임 목록을 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<FindTodayQuestionResDto>>> todayQuestionList(@ApiIgnore Authentication authentication) {
        log.info("todayQuestionList 호출");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        List<FindTodayQuestionResDto> findTodayQuestionResDtoList = questionService.findTodayQuestion(userId);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_TODAY_QUESTION_SUCCESS, findTodayQuestionResDtoList), HttpStatus.OK);
    }

    @ApiOperation(value = "특정 모임 질문 전체 조회", notes = "특정 모임 질문 전체 조회")
    @Parameter(name = "meetingId", description = "질문 조회 할 모임 아이디")
    @GetMapping("/{meetingId}")
    public ResponseEntity<ApiResponse<List<FindQuestionResDto>>> questionList(@PathVariable Long meetingId) {
        log.info("모임 질문 전체 조회 meetingId : {}", meetingId);
        List<FindQuestionResDto> findQuestionResDtoList = questionService.findQuestion(meetingId);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_QUESTION_SUCCESS, findQuestionResDtoList), HttpStatus.OK);
    }

    // 수동으로 오늘 질문 생성
    @ApiOperation(value = "[Admin] 수동으로 오늘 질문 생성", notes = "Admin 용 - 수동으로 오늘 질문 생성")
    @GetMapping("/job")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> startJob() throws Exception {
        Map<String, JobParameter> parameters = new HashMap<>();
        parameters.put("timestamp", new JobParameter(System.currentTimeMillis()));
        JobExecution jobExecution = jobLauncher.run(job, new JobParameters(parameters));
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_TODAY_QUESTION_SUCCESS, "Batch job " + jobExecution.getStatus()), HttpStatus.OK);
    }
}