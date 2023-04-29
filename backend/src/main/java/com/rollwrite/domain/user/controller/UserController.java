package com.rollwrite.domain.user.controller;

import com.rollwrite.domain.user.dto.FindUserResDto;
import com.rollwrite.domain.user.service.UserService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Optional;

/**
 * 구현 methods
 * 1. user 회원 정보 조회
 * 2. User 회원 정보 수정
 * 3. User 회원 탈최
 */
@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 1. User 회원 정보 조회
    @GetMapping("/{identifier}")
    public ResponseEntity<ApiResponse<?>> userDetails(@PathVariable String identifier) {
        FindUserResDto findUserResDto = userService.findUser(identifier);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_USER_SUCCESS, findUserResDto), HttpStatus.OK);
    }

    // 2. User 회원 정보 수정

    // 3. User 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<ApiResponse<?>> removeUser(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("회원 탈퇴할 userId : {}", userId);
        userService.removeUser(userId);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.REMOVE_SUCCESS), HttpStatus.OK);
    }


}