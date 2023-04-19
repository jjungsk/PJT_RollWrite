package com.rollwrite.domain.user.controller;

import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @GetMapping()
    public ResponseEntity<ApiResponse<?>> test() {
        log.info("test");
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.TEST, "test"), HttpStatus.OK);
    }

}