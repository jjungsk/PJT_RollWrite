package com.rollwrite.global.auth;

import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * 현재 Access Token으로 부터 인증된 유저의
 * 상세정보 (활성화 여부, 만료, 룰 등) 관련 서비스 정의
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));
        return new CustomUserDetails(user);
    }
}