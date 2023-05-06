package com.rollwrite.domain.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.rollwrite.domain.user.dto.AddAccessTokenResDto;
import com.rollwrite.domain.user.dto.AddTokenCookieDto;
import com.rollwrite.domain.user.service.AuthService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
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
import java.io.IOException;

/**
 * 구현 methods
 * 1. 카카오 로그인
 * 2. AccessToken 재발급
 * 3. 카카로 로그아웃
 */
@Api(tags = {"01. Auth-Controller (카카오, 토큰 재발급)"})
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 1. 카카오 로그인
    @ApiOperation(value = "카카오 로그인", notes = "카카오에서 받은 Token 값으로 로그인")
    @Parameter(name = "code", description = "카카오에서 받은 Token")
    @GetMapping("/kakao/login")
    public ResponseEntity<?> kakaoLogin(@RequestParam("code") String code) throws IOException {
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
    @ApiOperation(value = "accessToken 재발급", notes = "Set-Cookie에 저장된 refreshToken 값으로 accessTorkn 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<?>> reissueAccessToken(@ApiIgnore @CookieValue(value = "refreshToken") Cookie cookie) {
        // cookie에 들어있는 refreshToken 값 String 으로 받기
        String cookieRefreshToken = cookie.getValue();
        log.info("test");

        // 새로 발급 받은 accessToken을 Dto에 담기
        AddAccessTokenResDto addAccessTokenResDto = authService.reissueAccessToken(cookieRefreshToken);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.REISSUE_SUCCESS, addAccessTokenResDto), HttpStatus.OK);
    }

    // 3. 카카오 로그아웃
    @ApiOperation(value = "카카오 로그아웃", notes = "accessToken 을 redis BlackList 등록")
    @PostMapping("/kakao/logout")
    public ResponseEntity<ApiResponse<?>> kakaoLogout() {
        // 로그 아웃할 유저의 identifier를 sping security에서 가져오기
        String identifier = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        authService.kakaoLogout(identifier);

        return new ResponseEntity<>(ApiResponse.success(SuccessCode.LOGOUT_SUCCESS), HttpStatus.OK);
    }

}
