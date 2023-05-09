package com.rollwrite.domain.notification.service;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Notification;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.notification.entity.Alarm;
import com.rollwrite.domain.notification.repository.AlarmRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FcmService;
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
    private final AlarmRepository alarmRepository;
    private final ParticipantRepository participantRepository;
    private final FcmService fcmService;

    // 1. firebase token 저장
    @Transactional
    public void addFirebaseToken(Long userId, String firebaseToken) {
        if (firebaseToken == null || firebaseToken.isEmpty()) return;

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        log.info("user : {}", user.toString());
        Optional<Alarm> alarm = alarmRepository.findAlarmByUser_IdAndFirebaseToken(userId, firebaseToken);

        if (alarm.isEmpty()) {
            Alarm saveAlarm = Alarm.builder()
                    .firebaseToken(firebaseToken)
                    .isAllowed(true)
                    .user(user)
                    .build();

            log.info("saveAlarm : {}", saveAlarm);
            alarmRepository.save(saveAlarm);
        }
    }

    // 2. 자동으로 알림을 보낼 tokenList 가져오기
    public void sendMessageAuto() throws FirebaseMessagingException {
        List<Participant> participantList = participantRepository.findMeetingAndUserAndTitleByProgress(false);
        log.info("meetingFindUserDtoList : {}", participantList.toString());

        // meetingId & meetingTitle 에 해당하는 userList와 tokenList구하기
        HashMap<Long, String> meetingIdAndTitle = new HashMap<>();
        HashMap<Long, List<Long>> meetingIdAndUser = new HashMap<>();
        HashMap<Long, List<String>> meetingIdAndToken = new HashMap<>();
        for (Participant participant : participantList) {
            Long meetingId = participant.getMeeting().getId();
            String title = participant.getMeeting().getTitle();
            Long userId = participant.getUser().getId();

            List<Alarm> alarmList = participant.getUser().getAlarmList();
            log.info("alarmList : {}", alarmList.toString());

            if (alarmList.size() == 0) continue;
            List<String> fcmTokenList = new ArrayList<>();

            for (Alarm userAlarm: alarmList) {
                fcmTokenList.add(userAlarm.getFirebaseToken());
            }

            // TODO : getOrDefault 사용으로
            // meetingId 에 userId 담기
            List<Long> userList = new ArrayList<>();
            if (meetingIdAndUser.containsKey(meetingId)) {
                userList = meetingIdAndUser.get(meetingId);
            }
            userList.add(userId);
            meetingIdAndUser.put(meetingId, userList);

            // meetingId 에 firebaseToken List 담기
            List<String> tokenList = new ArrayList<>();
            if (meetingIdAndToken.containsKey(meetingId)) {
                tokenList = meetingIdAndToken.get(meetingId);
            }
            tokenList.addAll(fcmTokenList);
            meetingIdAndToken.put(meetingId, tokenList);

            // meetingId 와 meetingTitle 저장
            if (meetingIdAndTitle.containsKey(meetingId)) continue;
            meetingIdAndTitle.put(meetingId, title);
        }

        // log 출력
        for (Long meetingId: meetingIdAndUser.keySet()) {
            log.info("meetingId : {}, meetingTitle : {}, tokenList : {}",
                    meetingId, meetingIdAndTitle.get(meetingId), meetingIdAndToken.get(meetingId).toString());
        }

        Integer failCnt = 0;
        for (Long meetingId: meetingIdAndToken.keySet()) {
            List<String> tokenList = meetingIdAndToken.get(meetingId);
            if (tokenList.isEmpty()) continue;

            Notification notification = Notification.builder()
                    .setTitle(meetingIdAndTitle.get(meetingId))
                    .setBody("오늘의 질문이 올라왔습니다^^")
                    .build();

            log.info("fcmTokenList : {}", meetingIdAndToken);
            failCnt += fcmService.sendMessageMany(notification, tokenList);

            // TODO : setInterval - 0.01 초 마다 FCM Alarm 실행
//            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
//            executorService.scheduleAtFixedRate(() -> {
//                try {
//                    fcmService.sendMultiAlarms(notification, tokenList);
//                } catch (FirebaseMessagingException e) {
//                    throw new RuntimeException(e);
//                }
//            }, 0, 10, TimeUnit.MILLISECONDS);
        }

//        log.info("fail cnt : {}", failCnt);
    }

}
