package com.rollwrite.domain.user.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rollwrite.domain.user.dto.AddAccessTokenResDto;
import com.rollwrite.domain.user.dto.AddKakaoUserResDto;
import com.rollwrite.domain.user.dto.AddTokenCookieDto;
import com.rollwrite.domain.user.entity.RefreshToken;
import com.rollwrite.domain.user.entity.TokenType;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.entity.UserType;
import com.rollwrite.domain.user.repository.RefreshTokenRepository;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FileService;
import com.rollwrite.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    @Value("${auth.kakao.redirect-uri}")
    private String REDIRECT_URL;
    @Value("${auth.kakao.rest-key}")
    private String REST_API_KEY;
    @Value("${auth.kakao.secret-key}")
    private String SECRET_KEY;
    @Value("${jwt.expiration.atk}")
    private Long ACCESS_TOKEN_EXPIRATION;
    @Value("${jwt.expiration.rtk}")
    private Long REFRESH_TOKEN_EXPIRATION;
    private final String BLACK = "-BlackList";
    private final RedisTemplate<String, String> redisTemplate;
    private final UserRepository userRepository; // DB - user 정보 저장
    private final FileService fileService;
    private final RefreshTokenRepository refreshTokenRepository; // Redis - refreshToken 저장

    // Local 함수 로그아웃 : 로그아웃한 accessToken을 redis 에 -BlackList key로 등록
    // 재로그인을 제외한 accessToken으로 접근 불가
    public void setBlackListKey(String identifier) {
        String blackListKey = identifier + BLACK;
        redisTemplate.opsForValue().set(blackListKey, "Forced Expiration", ACCESS_TOKEN_EXPIRATION, TimeUnit.MILLISECONDS);
    }

    // Local 함수 로그아웃 : redis 에 black list 처리된 accessToken 인지 확인
    public boolean isBlackListAccessToken(String identifier) {
        identifier = identifier + BLACK;
        return redisTemplate.hasKey(identifier);
    }

    // Local 함수 (1-3). 회원 가입
    @Transactional
    public User registKakaoUser(AddKakaoUserResDto addKakaoUserResDto) throws IOException {
        String imagePath = fileService.transferUrlToFile("profile", addKakaoUserResDto.getProfileImage());
        // User Rentity에 담기
        User user = User.builder()
                .identifier(addKakaoUserResDto.getId())
                .nickname(addKakaoUserResDto.getNickname())
                .profileImage(imagePath)
                .type(UserType.USER)
                .build();
        userRepository.save(user);

        return user;
    }

    // Local 함수 (1-2). 카카오 유저 정보 요청 함수 (by. accessToken)
    private AddKakaoUserResDto getKakaoUserInfo(String kakaoAccessToken) throws JsonProcessingException {

        // Http Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        // response body에 있는 정보 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        String id = jsonNode.get("id").asText();
        String nickname = jsonNode.get("properties").get("nickname").asText();
        String profileImage = jsonNode.get("properties").get("profile_image").asText();

        // redis Black List user 라면 삭제
        if (isBlackListAccessToken(id)) {
            redisTemplate.delete(id + BLACK);
        }

        return AddKakaoUserResDto.builder()
                .id(id)
                .nickname(nickname)
                .profileImage(profileImage)
                .build();
    }

    // Local 함수 (1-1). 카카오 accessToken 요청 함수
    private String getKakaoAccessToken(String code) throws JsonProcessingException {
        // Http Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", REST_API_KEY);
        body.add("redirect_uri", REDIRECT_URL);
        body.add("code", code);
        body.add("client_secret", SECRET_KEY);

        // Http 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // Http 응답 (JSON) -> AccessToken Parsing
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String kakaoAccessToken = jsonNode.get("access_token").asText();

        return kakaoAccessToken;
    }

    // Main 함수 1. 카카오 로그인 메인 로직
    @Transactional
    public AddTokenCookieDto kakaoLogin(String code) throws IOException {

        // 1. "인가 코드"로 "accessToken" 요청
        String kakaoAccessToken = getKakaoAccessToken(code);

        // 2. "accessToken"으로 유저 정보 호출
        AddKakaoUserResDto addKakaoUserResDto = getKakaoUserInfo(kakaoAccessToken);

        // 3. DB에 로그인 User 정보 불러 오기
        Optional<User> user = userRepository.findByIdentifier(addKakaoUserResDto.getId());

        // 유저 정보가 없다면 회원 가입 진행
        if (user.isEmpty()) {
            user = Optional.ofNullable(registKakaoUser(addKakaoUserResDto));
        }

        // 4. 새로운 accessToken과 refreshToken 을 생성하여 redis에 refreshToken 저장
        String identifier = user.get().getIdentifier();
        String role = user.get().getType().name();
        String accessToken = JwtTokenUtil.createAccessToken(identifier, role);
        String refreshToken = JwtTokenUtil.createRefreshToken(identifier, role);

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .identifier(identifier)
                .refreshToken(refreshToken)
                .build();
        refreshTokenRepository.saveRefreshToken(refreshTokenEntity);

        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(REFRESH_TOKEN_EXPIRATION / 1000) // 초 단위
                .build();

        return AddTokenCookieDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .responseCookie(responseCookie)
                .build();
    }

    // Main 함수 2. accessToken 재발급
    public AddAccessTokenResDto reissueAccessToken(String cookieRefreshToken) throws NullPointerException {

        // (1) refreshToken 검증
        JWTVerifier verifier = JwtTokenUtil.getVerifier(TokenType.REFRESH);
        JwtTokenUtil.handleError(verifier, cookieRefreshToken);
        DecodedJWT decodedJWT = verifier.verify(cookieRefreshToken);
        String identifier = decodedJWT.getSubject();

        // (2) redis 검증
        String redisRefreshToken = redisTemplate.opsForValue().get(identifier);

        if (Objects.isNull(redisRefreshToken)) {
            throw new NullPointerException();
        }

        // (3) accessToken 재발급
        String accessToken = JwtTokenUtil.createAccessToken(identifier, decodedJWT.getClaim("role").asString());
        return AddAccessTokenResDto.builder()
                .accessToken(accessToken)
                .build();
    }

    // Main 함수 3. 카카오 로그아웃 메인 로직
    public void kakaoLogout(String identifier) {
        // redis RefreshToken 삭제
        redisTemplate.delete(identifier);

        // redis 에 해당 유저를 BlackList로 등록 (그 유저를 포함한 모든 accessToken에 대하여 접근 불가)
        setBlackListKey(identifier);

    }

    // Main 함수 4. user 정보 찾기
    public User findUserByIdentifier(String identifier) {
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        return user;
    }

}
