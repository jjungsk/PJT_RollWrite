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
                                                                      @RequestBody AddQuestionReqDto addQuestionRequestDto) {
        log.info("addQuestionRequestDto : " + addQuestionRequestDto);
        AddQuestionResDto addQuestionResponseDto = questionService.addQuestion(1L, addQuestionRequestDto);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_QUESTION_SUCCESS, addQuestionResponseDto), HttpStatus.OK);
    }

    @PostMapping("/answer")
    public ResponseEntity<ApiResponse<AddQuestionResDto>> addAnswer(@ApiIgnore Authentication authentication,
                                                                    @RequestPart AddAnswerReqDto addAnswerRequestDto,
                                                                    @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("addAnswerRequestDto : " + addAnswerRequestDto);
        questionService.addAnswer(1L, addAnswerRequestDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_ANSWER_SUCCESS, null), HttpStatus.OK);
    }

    @PatchMapping("/answer")
    public ResponseEntity<ApiResponse> modifyAnswer(@ApiIgnore Authentication authentication,
                                                                            @RequestPart ModifyAnswerReqDto modifyAnswerRequestDto,
                                                                            @RequestPart(required = false) MultipartFile image) throws IOException {
        log.info("modifyAnswerRequestDto : " + modifyAnswerRequestDto);
        questionService.modifyAnswer(1L, modifyAnswerRequestDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_ANSWER_SUCCESS, null), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<FindTodayQuestionResDto>>> todayQuestionList(@ApiIgnore Authentication authentication) {
        log.info("call todayQuestionList");
        List<FindTodayQuestionResDto> findTodayQuestionResponseDtoList = questionService.findTodayQuestion(1L);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_TODAY_QUESTION_SUCCESS, findTodayQuestionResponseDtoList), HttpStatus.OK);
    }
}