package com.rollwrite.domain.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.rollwrite.domain.user.dto.AddAccessTokenResDto;
import com.rollwrite.domain.user.dto.AddTokenCookieDto;
import com.rollwrite.domain.user.service.AuthService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.Cookie;

/**
 * 구현 methods
 * 1. 카카오 로그인
 * 2. AccessToken 재발급
 * 3. 카카로 로그아웃
 */
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 1. 카카오 로그인
    @GetMapping("/kakao/login")
    public ResponseEntity<?> kakaoLogin(@RequestParam("code") String code) throws JsonProcessingException {
        AddTokenCookieDto addTokenCookieDto = authService.kakaoLogin(code);

        // accessToken Dto 담기
        AddAccessTokenResDto addAccessTokenResDto = AddAccessTokenResDto.builder()
                .accessToken(addTokenCookieDto.getAccessToken())
                .build();
        String cookie = addTokenCookieDto.getResponseCookie().toString();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie)
                .body(ApiResponse.success(SuccessCode.LOGIN_SUCCESS, addAccessTokenResDto));
    }

    // 2. accessToken 재발급 요청 by cookie의 refreshToken
    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<?>> reissueAccessToken(@ApiIgnore @CookieValue(value = "refreshToken") Cookie cookie) {
        // cookie에 들어있는 refreshToken 값 String 으로 받기
        String cookieRefreshToken = cookie.getValue();

        // 새로 발급 받은 accessToken을 Dto에 담기
        AddAccessTokenResDto addAccessTokenResDto = authService.reissueAccessToken(cookieRefreshToken);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.REISSUE_SUCCESS, addAccessTokenResDto), HttpStatus.OK);
    }

    // 3. 카카오 로그아웃
    @PostMapping("/kakao/logout")
    public ResponseEntity<ApiResponse<?>> kakaoLogout() {
        // 로그 아웃할 유저의 identifier를 sping security에서 가져오기
        String identifier = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        authService.kakaoLogout(identifier);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.LOGOUT_SUCCESS), HttpStatus.OK);
    }

    // * spring security 에서 로그인한 유저 정보 중 identifier 값 가져오는 방법
    @GetMapping("/search/me")
    public void searchMe(@ApiIgnore Authentication authentication) {
        // CustomUserDetails.class 정보 가져오기 by Authentication
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("Authentication userId : {}", userId);

        // by. spring security 의 context holder
        String identifier = (String) SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("SecurityContextHolder identifier : {}", identifier);
    }

    // 권한 테스트
    @GetMapping("/test/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> testAdmin() throws Exception {
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.TEST, "Admin만 접근 가능합니다."), HttpStatus.OK);
    }

    @GetMapping("/test/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ApiResponse> testUser() throws Exception {
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.TEST, "User도 접근 가능합니다."), HttpStatus.OK);
    }
}
