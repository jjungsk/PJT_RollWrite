package com.rollwrite.global.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.rollwrite.domain.user.entity.TokenType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * JWT 토큰 유틸 정의
 * Spring Security JWT 토큰 해석 및 유틸리티
 */
@Slf4j
@Component
public class JwtTokenUtil {
    private static String secretKeyAT;
    private static String secretKeyRT;
    private static Integer refreshTokenExpirationTime;
    private static Integer accessTokenExpirationTime;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "rollwrite.com";

    // 기본 생성자 application.yml 설정한 secretKey, atk, rtk 제한 시간 설정
    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret.atk}") String secretKeyAT, @Value("${jwt.secret.rtk}") String secretKeyRT,
                        @Value("${jwt.expiration.rtk}") Integer refreshTokenExpirationTime, @Value("${jwt.expiration.atk}") Integer accessTokenExpirationTime) {
        this.secretKeyAT = secretKeyAT;
        this.secretKeyRT = secretKeyRT;
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
        this.accessTokenExpirationTime = accessTokenExpirationTime;
    }

    // JWt의 서명 및 구조를 검증 HMAC512 암호화 사용
    public static JWTVerifier getVerifier(TokenType tokenType) {
        String secretKey = "";
        if (tokenType == TokenType.ACCESS) {
            secretKey = secretKeyAT;
        } else if (tokenType == TokenType.REFRESH) {
            secretKey = secretKeyRT;
        }

        log.info("JWRVerifier의 secretKey : {}", secretKey);
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static String createAccessToken(String identifier) {
        Date expires = JwtTokenUtil.createTokenExpiration(accessTokenExpirationTime);
        log.info("accessToken 암호화 전 시간 : {}", expires);
        return JWT.create()
                .withSubject(identifier)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKeyAT.getBytes()));
    }

    public static String createRefreshToken(String identifier) {
        Date expires = JwtTokenUtil.createTokenExpiration(refreshTokenExpirationTime);
        return JWT.create()
                .withSubject(identifier)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKeyRT.getBytes()));
    }

    // 현재 시간 + 제한 시간
    public static Date createTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

//    public static String getAccessToken(String identifier) {
//        String accessToken = null;
//        return accessToken;
//    }



    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKeyAT.getBytes()))
                .withIssuer(ISSUER)
                .build();
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}