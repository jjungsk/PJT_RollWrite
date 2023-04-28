package com.rollwrite.domain.user.service;

import com.rollwrite.domain.user.dto.AddUserResDto;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.entity.UserType;
import com.rollwrite.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * User Service Logic
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // User 찾기
    @Transactional(readOnly = true)
    public AddUserResDto findUserByIdentifier(String identifier) {
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        AddUserResDto addUserResDto = AddUserResDto.builder()
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .build();

        return addUserResDto;
    }

}