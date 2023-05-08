package com.rollwrite.global.exception;

import com.auth0.jwt.exceptions.*;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtExceptionHandlerFilter extends OncePerRequestFilter {

    /**
     * Token 관련 Error 핸들링
     * why? @ControllerAdvice 에서 정의한 Exception은 Filter 이후 동작
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            DirectExceptionHandler.sendError(response, ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION, "잘못된 토큰입니다."));
            ex.printStackTrace();
            throw ex;
        } catch (IllegalArgumentException ex) {
            DirectExceptionHandler.sendError(response, ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION, "요청자가 찾는 정보가 없습니다."));
            ex.printStackTrace();
        } catch (TokenExpiredException ex) {
            DirectExceptionHandler.sendError(response, ApiResponse.error(ErrorCode.UNAUTHORIZED_EXCEPTION, "토큰이 만료되었습니다."));
            ex.printStackTrace();
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
