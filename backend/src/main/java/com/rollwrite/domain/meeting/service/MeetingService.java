package com.rollwrite.domain.meeting.service;

import com.rollwrite.domain.meeting.dto.AddMeetingRequestDto;
import com.rollwrite.domain.meeting.dto.AddMeetingResponseDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.entity.Tag;
import com.rollwrite.domain.meeting.entity.TagMeeting;
import com.rollwrite.domain.meeting.repository.MeetingRepository;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.meeting.repository.TagRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MeetingService {

    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final MeetingRepository meetingRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public AddMeetingResponseDto addMeeting(Long userId,
        AddMeetingRequestDto addMeetingRequestDto) {

        User user = userRepository.findById(userId)
            .orElseThrow();

        // 초대 링크 생성
        String inviteUrl = "http://localhost:8081/api/auth/join=";
        String inviteCode = "";
        try {
            SecureRandom random = SecureRandom.getInstanceStrong();
            byte[] bytes = new byte[16];
            random.nextBytes(bytes);
            log.info("bytes : " + bytes.toString());
            inviteCode = bytes.toString();

//            addMeetingRequestDto.updateInviteUrl(inviteUrl);
//            String link = Base64.getUrlEncoder().encodeToString(bytes);
//            log.info("link : " + link);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        // 태그 다시 변환해주기
        List<Tag> tagList = new ArrayList<>();
        List<TagMeeting> tagMeetingList = new ArrayList<>();
        for (Long id : addMeetingRequestDto.getTag()) {
            Tag tag = tagRepository.findById(id).get();
            tagList.add(tag);

            TagMeeting tagMeeting = TagMeeting.builder()
                .tag(tag)
//                .meeting()
                .build();
        }

        // 모임 생성
        Meeting meeting = Meeting.builder()
            .addMeetingRequestDto(addMeetingRequestDto)
            .inviteCode(inviteCode)
            .tagMeetingList(tagMeetingList)
            .build();
        meetingRepository.save(meeting);

        // Chat GPT 생성 질문 10개 저장

        //모임에 참여자 추가
        Participant participant = Participant.builder()
            .user(user)
            .meeting(meeting)
            .build();
        participantRepository.save(participant);

        return AddMeetingResponseDto.builder()
            .meeting(meeting)
            .inviteUrl(inviteUrl + inviteCode)
            .build();
    }
}
