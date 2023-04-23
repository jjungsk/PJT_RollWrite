package com.rollwrite.domain.meeting.service;

import com.rollwrite.domain.meeting.dto.AddMeetingRequestDto;
import com.rollwrite.domain.meeting.dto.AddMeetingResponseDto;
import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.entity.Tag;
import com.rollwrite.domain.meeting.entity.TagMeeting;
import com.rollwrite.domain.meeting.repository.MeetingRepository;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.meeting.repository.TagMeetingRepository;
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
    private final TagMeetingRepository tagMeetingRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public AddMeetingResponseDto addMeeting(Long userId,
        AddMeetingRequestDto addMeetingRequestDto) throws NoSuchAlgorithmException {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 초대 코드 생성
        String inviteUrl = "http://localhost:8081/api/auth/join=";
        SecureRandom random = SecureRandom.getInstanceStrong();
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);
        String inviteCode = bytes.toString();

//        addMeetingRequestDto.updateInviteUrl(inviteUrl);
//        String link = Base64.getUrlEncoder().encodeToString(bytes);
//        log.info("link : " + link);

        // Meeting 생성
        Meeting meeting = Meeting.builder()
            .addMeetingRequestDto(addMeetingRequestDto)
            .inviteCode(inviteCode)
            .build();
        meetingRepository.save(meeting);

        // tag id에 해당하는 Meeting(tagMeetingList)에 추가
        List<TagMeeting> tagMeetingList = tagIdToTagMeetingList(
            meeting, addMeetingRequestDto.getTag());
        meeting.updateTagMeetingList(tagMeetingList);

        // TODO:Chat GPT 생성 질문 10개 저장

        // Meeting 생성자 Meeting에 추가
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

    private List<TagMeeting> tagIdToTagMeetingList(Meeting meeting, List<Long> tagIds) {
        List<TagMeeting> tagMeetingList = new ArrayList<>();
        for (Long id : tagIds) {
            // tag id에 해당하는 tag 찾기
            Tag tag = tagRepository.findById(id).get();

            // TagMeeting 에 추가
            TagMeeting tagMeeting = TagMeeting.builder()
                .tag(tag)
                .meeting(meeting)
                .build();
            tagMeetingRepository.save(tagMeeting);

            tagMeetingList.add(tagMeeting);
        }
        return tagMeetingList;
    }
}
