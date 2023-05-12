package com.rollwrite.domain.user.controller;

import com.rollwrite.domain.user.dto.FindUserProfileResDto;
import com.rollwrite.domain.user.dto.ModifyUserReqDto;
import com.rollwrite.domain.user.service.AuthService;
import com.rollwrite.domain.user.service.UserService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.Optional;

/**
 * 구현 methods
 * 1. user 회원 정보 조회
 * 2. User 회원 정보 수정
 * 3. User 회원 탈퇴
 */
@Api(tags = {"02. User-Controller (유저 정보 관련)"})
@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    // 1. User 회원 정보 조회
    @ApiOperation(value = "본인 및 타인 회원 정보 조회",
            notes = "PathVariable에 찾고자 하는 userId 값이 없으면 본인 조회 (단, swagger는 불가능 하고 postman 에서는 가능 + api 호출 path 는 '/' 꼭 붙여야 한다!!!)")
    @Parameter(name = "userId", description = "찾고자 하는 userId 또는 빈 값(본인 조회)")
    @GetMapping({"/", "/{userId}"})
    public ResponseEntity<ApiResponse<?>> userDetails(@ApiIgnore Authentication authentication,
                                                      @PathVariable(required = false) Optional<Long> userId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long id = userId.orElse(userDetails.getUserId());

        FindUserProfileResDto findUserProfileResDto = userService.findUser(id);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_USER_SUCCESS, findUserProfileResDto), HttpStatus.OK);
    }

    // 2. User 회원 정보 수정
    @ApiOperation(value = "유저의 회원 정보 수정", notes = "유저 이름과 프로필 수정 가능")
    @Parameter(name = "profileImage", description = "수정 할 프로필 이미지")
    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ApiResponse<?>> modifyUser(@ApiIgnore Authentication authentication,
                                                     @RequestPart(value = "modifyUserReqDto", required = false) ModifyUserReqDto modifyUserReqDto,
                                                     @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();

        userService.modifyUser(userId, modifyUserReqDto, profileImage);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_USER_SUCCESS), HttpStatus.OK);
    }

    // 3. User 회원 탈퇴
    @ApiOperation(value = "회원 탈퇴", notes = "본인 회원 탈퇴")
    @DeleteMapping
    public ResponseEntity<ApiResponse<?>> removeUser(@ApiIgnore Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        
        // 회원 탈퇴 전 로그아웃 로직 - Redis의 refreshToken 삭제 + AccessToken Black 처리
        String identifier = userDetails.getIdentifier();
        log.info("로그아웃 할 identifier : {}", identifier);
        authService.kakaoLogout(identifier);

        // DB 유저 정보 삭제
        Long userId = userDetails.getUserId();
        log.info("회원 탈퇴할 userId : {}", userId);
        userService.removeUser(userId);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.REMOVE_USER_SUCCESS), HttpStatus.OK);
    }

}