package com.rollwrite.domain.user.service;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.user.dto.FindUserProfileResDto;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;

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
    private final ParticipantRepository participantRepository;

    // 1. User 회원 정보 조희
    public FindUserProfileResDto findUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 해당 유저가 현재 참여 중인 모임
        List<Meeting> meetingIs = participantRepository.findMeetingByUserAndIsDone(userId, false);
        // 해당 유저가 현재 참여 완료 된 모임
        List<Meeting> meetingIsDone = participantRepository.findMeetingByUserAndIsDone(userId, true);

        log.info(meetingIs.toString());
        log.info(meetingIsDone.toString());

        return FindUserProfileResDto.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .cntMeetingProgress(meetingIs.size())
                .cntMeetingProgressIsDone(meetingIsDone.size())
                .build();
    }

    // 2. User 회원 정보 수정
    @Transactional
    public void modifyUser(Long userId, String nickname, MultipartFile multipartFile) throws IOException {
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
        }

        user.update(modifyNickname, modifyProfileImage);
    }

    // 3. User 프로필 이미지 삭제
    @Transactional
    public void removeUserProfile(Long userId) throws UnknownHostException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        String image = Optional.ofNullable(user.getProfileImage())
                .orElseThrow(() -> new IllegalArgumentException("사진이 없습니다."));

        fileService.fileDelete(image);
        user.updateImage(null);

    }

    // 4. User 회원 탈퇴
    @Transactional
    public void removeUser(Long userId) {
        userRepository.deleteById(userId);

        log.info("회원 탈퇴 유저 정보 : {}");
    }

}