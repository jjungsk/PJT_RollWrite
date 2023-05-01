package com.rollwrite.domain.user.service;

import com.rollwrite.domain.user.dto.FindUserResDto;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * User Service Logic
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final FileService fileService;
    private final UserRepository userRepository;

    // 1. User 회원 정보 조희
    public FindUserResDto findUser(String identifier) {
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        return FindUserResDto.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .build();
    }

    // 2. User 회원 정보 수정
    @Transactional
    public void modifyUser(Long userId, String nickname, MultipartFile multipartFile) throws IOException {
        log.info("회원 정보 수정");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        String modifyNickname = user.getNickname();
        String modifyProfileImage = user.getProfileImage();
        if (nickname != null) {
            modifyNickname = nickname;
        }
        if (multipartFile != null && !multipartFile.isEmpty()) {
            if (user.getProfileImage() != null) fileService.fileDelete(user.getProfileImage());
            modifyProfileImage = fileService.fileUpload("profile", multipartFile);
//            s3Service.deleteFile(modifyProfileImage);
//            modifyProfileImage = s3Service.addFile(multipartFile);
        }

        user.update(modifyNickname, modifyProfileImage);
    }

    // 3. User 회원 탈퇴
    @Transactional
    public void removeUser(Long userId) {
        userRepository.deleteById(userId);

        log.info("회원 탈퇴 유저 정보 : {}");
    }

}