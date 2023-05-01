package com.rollwrite.domain.question.controller;

import com.rollwrite.domain.question.dto.*;
import com.rollwrite.domain.question.service.QuestionService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QuestionController {

    private final Job notificationAlarmJob;
    private final JobLauncher jobLauncher;
    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<ApiResponse> addQuestion(@ApiIgnore Authentication authentication,
                                                   @RequestBody AddQuestionReqDto addQuestionReqDto) {
        log.info("사용자 질문 생성 addQuestionReqDto : " + addQuestionReqDto);
        questionService.addQuestion(1L, addQuestionReqDto);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_QUESTION_SUCCESS), HttpStatus.OK);
    }

    @PostMapping("/answer")
    public ResponseEntity<ApiResponse> addAnswer(@ApiIgnore Authentication authentication,
                                                 @RequestPart AddAnswerReqDto addAnswerReqDto,
                                                 @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("답변 생성 addAnswerReqDto : " + addAnswerReqDto);
        questionService.addAnswer(1L, addAnswerReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_ANSWER_SUCCESS), HttpStatus.OK);
    }

    @PatchMapping("/answer")
    public ResponseEntity<ApiResponse> modifyAnswer(@ApiIgnore Authentication authentication,
                                                    @RequestPart ModifyAnswerReqDto modifyAnswerReqDto,
                                                    @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("답변 수정 modifyAnswerReqDto : " + modifyAnswerReqDto);
        questionService.modifyAnswer(1L, modifyAnswerReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_ANSWER_SUCCESS), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<FindTodayQuestionResDto>>> todayQuestionList(@ApiIgnore Authentication authentication) {
        log.info("todayQuestionList 호출");
        List<FindTodayQuestionResDto> findTodayQuestionResDtoList = questionService.findTodayQuestion(1L);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_TODAY_QUESTION_SUCCESS, findTodayQuestionResDtoList), HttpStatus.OK);
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<ApiResponse<List<FindQuestionResDto>>> questionList(@ApiIgnore Authentication authentication,
                                                                              @PathVariable Long meetingId) {
        log.info("모임 질문 전체 조회 meetingId : " + meetingId);
        List<FindQuestionResDto> findQuestionResDtoList = questionService.findQuestion(meetingId);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_QUESTION_SUCCESS, findQuestionResDtoList), HttpStatus.OK);
    }

    // 수동으로 오늘 질문 생성
    @GetMapping("/job")
    public ResponseEntity<ApiResponse<String>> startJob() throws Exception {
        Map<String, JobParameter> parameters = new HashMap<>();
        parameters.put("timestamp", new JobParameter(System.currentTimeMillis()));
        JobExecution jobExecution = jobLauncher.run(notificationAlarmJob, new JobParameters(parameters));
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_TODAY_QUESTION_SUCCESS, "Batch job "+ jobExecution.getStatus()), HttpStatus.OK);
    }
}