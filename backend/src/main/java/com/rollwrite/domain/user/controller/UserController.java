package com.rollwrite.domain.user.controller;

import com.rollwrite.domain.user.dto.FindUserResDto;
import com.rollwrite.domain.user.service.UserService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 구현 methods
 * 1. user 정보 조회 by. identifier
 */
@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 1. User 정보 조회
    @GetMapping("/{identifier}")
    public ResponseEntity<ApiResponse<?>> userDetails(@PathVariable String identifier) {
        FindUserResDto findUserResDto = userService.findUser(identifier);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_USER_SUCCESS, findUserResDto), HttpStatus.OK);
    }

}