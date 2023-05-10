package com.rollwrite.global.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.rollwrite.domain.user.entity.TokenType;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.service.AuthService;
import com.rollwrite.global.exception.DirectExceptionHandler;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.ErrorCode;
import com.rollwrite.global.util.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    private AuthService authService;
    private ArrayList<String> passuri;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, AuthService authService,
                                   @Value("${security.passuri}") ArrayList<String> passuri) {
        super(authenticationManager);
        this.authService = authService;
        this.passuri = passuri;
    }

    // Client 요청 시 Filter
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Read the Authorization header, where the JWT Token should be
        String header = request.getHeader(JwtTokenUtil.HEADER_STRING); // Authorization
        String uri = request.getRequestURI();

        log.info("uri : " + uri);
        log.info("header : " + header);

        // If header does not contain Bearer or is null delegate to Spring impl and exit
        if (header == null || !header.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Q. invalid accessToken 이 들어와도 우선 실행.. 이게 맞는지 모르겠음
        if (passuri.contains(uri)) {
            log.info("passURI : {}", uri);
            filterChain.doFilter(request, response);
            return;
        }

        // Client Validation check
        Authentication authentication = getAuthentication(response, request);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    // Client 인가 validation 확인
    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletResponse response, HttpServletRequest request) throws IOException{
        String token = Optional.ofNullable(request.getHeader(JwtTokenUtil.HEADER_STRING))
                .orElseThrow(() -> new IllegalArgumentException("헤더가 비었음"));
        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.

        // parse the token and validate it (decode)
        JWTVerifier verifier = JwtTokenUtil.getVerifier(TokenType.ACCESS);
        JwtTokenUtil.handleError(response, token);

        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
        String identifier = decodedJWT.getSubject();

        if (identifier != null) {
            // jwt 토큰에 포함된 계정 정보(identifier) 통해 실제 디비에 해당 정보의 계정이 있는지 조회
            User user = authService.findUserByIdentifier(identifier);

            if (user != null) {
                // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                CustomUserDetails userDetails = new CustomUserDetails(user);
                // Redis에 Black List 처리된 accessToken 인지 확인
                if (authService.isBlackListAccessToken(identifier)) {
                    throw new TokenExpiredException("You need");
                }
//                    Optional.ofNullable(authService.isBlackListAccessToken(identifier))
//                            .orElseThrow(() -> new TokenExpiredException("재 로그인이 필요합니다."));

                // setAuthorities
                List<GrantedAuthority> roles = new ArrayList<>();
                roles.add(new SimpleGrantedAuthority("ROLE_USER"));
                if ("ADMIN".equals(decodedJWT.getClaim("role").asString())) {
                    roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                }
                userDetails.setAuthorities(roles);

                UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(identifier, null, userDetails.getAuthorities());
                jwtAuthentication.setDetails(userDetails);

                return jwtAuthentication;
            }
        }
        return null;
    }
}