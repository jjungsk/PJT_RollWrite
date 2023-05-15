package com.rollwrite.domain.notification.service;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.notification.dto.SendMessageAllDto;
import com.rollwrite.domain.notification.dto.SendMessageManyDto;
import com.rollwrite.domain.notification.dto.SendMessageOneDto;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FcmService;
import com.rollwrite.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationService {

    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final FcmService fcmService;
    private final FileService fileService;

    // 1. 유저별 개인 FCM Token 저장
    @Transactional
    public void addFirebaseToken(Long userId, String firebaseToken) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        user.updateToken(firebaseToken);
    }

    // 2. FCM 알림 보내기 send - 개인
    public void sendMessageOne(SendMessageOneDto sendMessageOneDto) throws FirebaseMessagingException {

        fcmService.sendMessageOne(sendMessageOneDto);
    }

    // 3. FCM 알림 보내기 sendMulticast - 다수 (한번에 최대 1000명)
    public void sendMessageMany(SendMessageManyDto sendMessageManyDto) throws FirebaseMessagingException {

        fcmService.sendMessageMany(sendMessageManyDto);
    }

    // 4. FCM 알림 보내기 sendAll - 자동 알림 보내기 Main
    public void sendMessageAuto() throws FirebaseMessagingException {
        List<Participant> participantList = participantRepository.findMeetingAndUserAndTitleByProgress(false);

        HashMap<Long, List<Long>> userIdAndMeetingList = new HashMap<>();
        HashMap<Long, String> userIdAndNickname = new HashMap<>();
        HashMap<Long, String> userIdAndToken = new HashMap<>();
        HashMap<Long, String> meetingIdAndTitle = new HashMap<>();
        for (Participant participant : participantList) {
            Long userId = participant.getUser().getId();
            String nickname = participant.getUser().getNickname();
            String token = participant.getUser().getFirebaseToken();
            Long meetingId = participant.getMeeting().getId();
            String title = participant.getMeeting().getTitle();

            // (1) userId 에 모임 목록 추가
            List<Long> meetingList = new ArrayList<>();
            if (userIdAndMeetingList.containsKey(userId)) {
                meetingList = userIdAndMeetingList.get(userId);
            }
            meetingList.add(meetingId);
            userIdAndMeetingList.put(userId, meetingList);

            // (2) userId 에 nickname 담기
            if (!userIdAndNickname.containsKey(userId)) userIdAndNickname.put(userId, nickname);

            // (3) userId 에 토큰 담기
            if (!userIdAndToken.containsKey(userId)) userIdAndToken.put(userId, token);

            // (4) meetingId 에 title 담기
            if (!meetingIdAndTitle.containsKey(meetingId)) meetingIdAndTitle.put(meetingId, title);

        }

        // Message 보내기
        SendMessageAllDto sendMessageAllDto = SendMessageAllDto.builder()
                .setUserIdAndMeetingList(userIdAndMeetingList)
                .setUserIdAndNickname(userIdAndNickname)
                .setUserIdAndToken(userIdAndToken)
                .setMeetingIdAndTitle(meetingIdAndTitle)
                .build();
        fcmService.sendMessageAuto(sendMessageAllDto);
    }

}
