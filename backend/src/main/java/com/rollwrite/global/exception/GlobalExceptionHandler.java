package com.rollwrite.global.exception;

import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> handleIllegalArgument(IllegalArgumentException e) {
        return new ResponseEntity<>(ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION, e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FakeException.class)
    public ResponseEntity<ApiResponse> handleFake(FakeException e) {
        return new ResponseEntity<>(ApiResponse.error(ErrorCode.BAD_REQUEST_FAKE, e.getMessage()), HttpStatus.OK);
    }
    
}