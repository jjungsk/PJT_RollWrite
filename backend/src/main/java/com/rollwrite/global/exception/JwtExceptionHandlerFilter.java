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
        log.info("들어옴?");
        try {
            filterChain.doFilter(request, response);
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("IllegalArgumentException");
            DirectExceptionHandler.sendError(response, ApiResponse.error(ErrorCode.VALIDATION_EXCEPTION, "호옹잉"));
            ex.printStackTrace();
        } catch (TokenExpiredException ex) {
            log.error("권한 없는 유저이지롱");
            DirectExceptionHandler.sendError(response, ApiResponse.error(ErrorCode.UNAUTHORIZED_EXCEPTION, "과연??"));
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
