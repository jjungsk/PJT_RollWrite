package com.rollwrite.domain.question.controller;

import com.rollwrite.domain.question.dto.AddQuestionRequestDto;
import com.rollwrite.domain.question.dto.AddQuestionResponseDto;
import com.rollwrite.domain.question.service.QuestionService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<ApiResponse<AddQuestionResponseDto>> addQuestion(@ApiIgnore Authentication authentication,
                                                                           @RequestBody AddQuestionRequestDto addQuestionRequestDto) {
        log.info("addQuestionRequestDto : " + addQuestionRequestDto);
        AddQuestionResponseDto addQuestionResponseDto = questionService.addQuestion(1L, addQuestionRequestDto);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_QUESTION_SUCCESS, addQuestionResponseDto), HttpStatus.OK);
    }

}