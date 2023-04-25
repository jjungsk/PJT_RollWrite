package com.rollwrite.domain.question.controller;

import com.rollwrite.domain.question.dto.*;
import com.rollwrite.domain.question.service.QuestionService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<ApiResponse<AddQuestionResDto>> addQuestion(@ApiIgnore Authentication authentication,
                                                                      @RequestBody AddQuestionReqDto addQuestionReqDto) {
        log.info("addQuestionReqDto : " + addQuestionReqDto);
        AddQuestionResDto addQuestionResDto = questionService.addQuestion(1L, addQuestionReqDto);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_QUESTION_SUCCESS, addQuestionResDto), HttpStatus.OK);
    }

    @PostMapping("/answer")
    public ResponseEntity<ApiResponse> addAnswer(@ApiIgnore Authentication authentication,
                                                 @RequestPart AddAnswerReqDto addAnswerReqDto,
                                                 @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("addAnswerReqDto : " + addAnswerReqDto);
        questionService.addAnswer(1L, addAnswerReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_ANSWER_SUCCESS), HttpStatus.OK);
    }

    @PatchMapping("/answer")
    public ResponseEntity<ApiResponse> modifyAnswer(@ApiIgnore Authentication authentication,
                                                    @RequestPart ModifyAnswerReqDto modifyAnswerReqDto,
                                                    @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("modifyAnswerReqDto : " + modifyAnswerReqDto);
        questionService.modifyAnswer(1L, modifyAnswerReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_ANSWER_SUCCESS), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<FindTodayQuestionResDto>>> todayQuestionList(@ApiIgnore Authentication authentication) {
        log.info("call todayQuestionList");
        List<FindTodayQuestionResDto> findTodayQuestionResDtoList = questionService.findTodayQuestion(1L);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_TODAY_QUESTION_SUCCESS, findTodayQuestionResDtoList), HttpStatus.OK);
    }

    @GetMapping("/{meetingId}")
    public ResponseEntity<ApiResponse<List<FindQuestionResDto>>> questionList(@ApiIgnore Authentication authentication,
                                                                              @PathVariable Long meetingId) {
        log.info("meetingId : " + meetingId);
        List<FindQuestionResDto> findQuestionResDtoList = questionService.findQuestion(meetingId);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_QUESTION_SUCCESS, findQuestionResDtoList), HttpStatus.OK);
    }
}