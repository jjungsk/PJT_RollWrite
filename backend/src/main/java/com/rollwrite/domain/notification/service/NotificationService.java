package com.rollwrite.domain.notification.service;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Notification;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.notification.dto.SendMessageManyReqDto;
import com.rollwrite.domain.notification.dto.SendMessageOneReqDto;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FcmService;
import com.rollwrite.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.UnknownHostException;
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

    // 1. firebase token 저장
    @Transactional
    public void addFirebaseToken(Long userId, String firebaseToken) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        user.updateToken(firebaseToken);
    }

    // 2. 개인 알림 보내기
    public void sendMessageOne(SendMessageOneReqDto sendMessageOneReqDto) throws FirebaseMessagingException {

        Notification notification = Notification.builder()
                .setTitle(sendMessageOneReqDto.getTitle())
                .setBody(sendMessageOneReqDto.getBody())
                .build();
        fcmService.sendMessageOne(notification, sendMessageOneReqDto.getFirebaseToken());
    }

    // 2. 개인 알림 보내기
    public void sendMessageMany(SendMessageManyReqDto sendMessageManyReqDto) throws FirebaseMessagingException {

        Notification notification = Notification.builder()
                .setTitle(sendMessageManyReqDto.getTitle())
                .setBody(sendMessageManyReqDto.getBody())
                .build();
        fcmService.sendMessageMany(notification, sendMessageManyReqDto.getFirebaseTokenList());
    }

    // 4. 자동으로 단체 알림을 보내기
    public void sendMessageAuto() throws FirebaseMessagingException {
        List<Participant> participantList = participantRepository.findMeetingAndUserAndTitleByProgress(false);
        log.info("meetingFindUserDtoList : {}", participantList.toString());

        // meetingId & meetingTitle 에 해당하는 userList와 tokenList구하기
        HashMap<Long, String> meetingIdAndTitle = new HashMap<>();
        HashMap<Long, String> meetingIdAndContent = new HashMap<>();
        HashMap<Long, List<Long>> meetingIdAndUser = new HashMap<>();
        HashMap<Long, List<String>> meetingIdAndToken = new HashMap<>();
        for (Participant participant : participantList) {
            String firebaseToken = participant.getUser().getFirebaseToken();
            if (firebaseToken == null || firebaseToken.isEmpty()) continue;

            Long meetingId = participant.getMeeting().getId();
            String title = participant.getMeeting().getTitle();
            Long userId = participant.getUser().getId();

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
            tokenList.add(firebaseToken);
            meetingIdAndToken.put(meetingId, tokenList);

            // meetingId 와 meetingTitle 저장
            if (!meetingIdAndTitle.containsKey(meetingId)) {
                meetingIdAndTitle.put(meetingId, title);
            }

            // meetingId 와 meetingQuestionContent 저장
            if (!meetingIdAndContent.containsKey(meetingId)) {
                List<Question> questionList = participant.getMeeting().getQuestionList();
                String question = "클릭해서 확인해 보세요";
                if (!questionList.isEmpty()) {
                    question = questionList.get(questionList.size() - 1).getContent();
                }
                meetingIdAndContent.put(meetingId, question);
            }
        }

        // log 출력
        for (Long meetingId : meetingIdAndUser.keySet()) {
            log.info("meetingId : {}, meetingTitle : {}, tokenList : {}",
                    meetingId, meetingIdAndTitle.get(meetingId), meetingIdAndToken.get(meetingId).toString());
        }

        Integer failCnt = 0;
        for (Long meetingId : meetingIdAndToken.keySet()) {
            List<String> firebaseTokenList = meetingIdAndToken.get(meetingId);
            if (firebaseTokenList.isEmpty()) continue;

            Notification notification = Notification.builder()
                    .setTitle(meetingIdAndTitle.get(meetingId))
                    .setBody("오늘의 질문! " + meetingIdAndContent.get(meetingId))
                    .build();

            log.info("fcmTokenList : {}", meetingIdAndToken);
            failCnt += fcmService.sendMessageMany(notification, firebaseTokenList);

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
