package com.rollwrite.domain.notification.service;

import com.rollwrite.domain.meeting.dto.MeetingFindUserDto;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
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

    // 1. firebase token 저장
    @Transactional
    public void updateFirebaseToken(Long userId, String firebaseToken) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        log.info("user 정보 : {}. firbaseToken : {}", user.toString(), firebaseToken);
        user.updateToken(firebaseToken);
        log.info("user 정보 : {}. firbaseToken : {}", user.toString(), firebaseToken);
    }

    // 2. 자동으로 알림을 보낼 userList 가져오기
    @Transactional
    public void findUserAndMeeting() {
        List<MeetingFindUserDto> meetingFindUserDtoList = participantRepository.findMeetingAndUserAndTitleByProgress(false);

        // meetingId & meetingTitle 에 해당하는 userList 구하기
        HashMap<Long, String> meetingIdAndTitle = new HashMap<>();
        HashMap<Long, List<Long>> meetingIdAndUser = new HashMap<>();
        for (MeetingFindUserDto meetingFindUserDto: meetingFindUserDtoList) {
            Long meetingId = meetingFindUserDto.getMeetingId();
            String title = meetingFindUserDto.getTitle();
            Long userId = meetingFindUserDto.getUserId();

            List<Long> list = new ArrayList<>();
            if (meetingIdAndUser.containsKey(meetingId)) {
                list = meetingIdAndUser.get(meetingId);
            }
            list.add(userId);
            meetingIdAndUser.put(meetingId, list);
            
            // TODO : getOrDefault 사용으로
//            meetingIdAndUser.put(meetingId, Arrays.asList(meetingIdAndUser.getOrDefault(meetingId, new ArrayList<>()).));

            if (meetingIdAndTitle.containsKey(meetingId)) continue;
            meetingIdAndTitle.put(meetingId, title);
        }

        for (Long meetingId: meetingIdAndUser.keySet()) {
            log.info("meetingId : {}, meetingTitle : {}, userList : {}",
                    meetingId, meetingIdAndTitle.get(meetingId), meetingIdAndUser.get(meetingId).toString());
        }

    }

}
