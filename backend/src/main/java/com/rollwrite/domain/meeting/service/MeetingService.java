package com.rollwrite.domain.meeting.service;

import com.rollwrite.domain.meeting.dto.*;
import com.rollwrite.domain.meeting.entity.*;
import com.rollwrite.domain.meeting.repository.*;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.question.repository.AnswerRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;

import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MeetingService {

    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final AnswerRepository answerRepository;
    private final MeetingRepository meetingRepository;
    private final AsyncMeetingService asyncMeetingService;
    private final AwardRepository awardRepository;
    private final TagMeetingRepository tagMeetingRepository;
    private final ParticipantRepository participantRepository;

    @Value("${inviteUrl}")
    private String baseUrl;

    @Transactional
    public AddMeetingResponseDto addMeeting(Long userId,
                                            AddMeetingRequestDto addMeetingRequestDto) throws NoSuchAlgorithmException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 초대 코드 생성
        // TODO: SecureRandom 서버에서는 작동 제대로 안 함 -> 수정 필요
//        SecureRandom random = SecureRandom.getInstanceStrong();
        long seed = System.currentTimeMillis();
        Random random = new Random(seed);
        byte[] codeBytes = new byte[15];
        random.nextBytes(codeBytes);
        String inviteCode = Base64.getUrlEncoder().withoutPadding().encodeToString(codeBytes);

        // Meeting 생성
        Meeting meeting = Meeting.builder()
                .addMeetingRequestDto(addMeetingRequestDto)
                .inviteCode(inviteCode)
                .build();
        meetingRepository.save(meeting);

        // tag id에 해당하는 Meeting(tagMeetingList)에 추가
        List<TagDto> tagList = new ArrayList<>();
        List<TagMeeting> tagMeetingList = tagIdToTagMeetingList(
                meeting, addMeetingRequestDto.getTag(), tagList);
        meeting.updateTagMeetingList(tagMeetingList);

        // 질문에 사용 될 Tag
        String tag = "";
        for (TagDto tagDto : tagList) {
            tag += tagDto.getContent() + ",";
        }
        // Chat GPT 생성 질문 10개 저장
        asyncMeetingService.saveGptQuestion(tag, meeting);

        // Meeting 생성자 Meeting에 추가
        Participant participant = Participant.builder()
                .user(user)
                .meeting(meeting)
                .build();
        participantRepository.save(participant);

        return AddMeetingResponseDto.builder()
                .meeting(meeting)
                .tag(tagList)
                .inviteUrl(baseUrl + inviteCode)
                .build();
    }

    private List<TagMeeting> tagIdToTagMeetingList(Meeting meeting, List<Long> tagIds,
                                                   List<TagDto> tagList) {
        List<TagMeeting> tagMeetingList = new ArrayList<>();
        for (Long id : tagIds) {
            // tag id에 해당하는 tag 찾기
            Tag tag = tagRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("ID에 해당하는 태그를 찾을 수 없습니다"));

            // Tag -> TagDto
            tagList.add(TagDto.of(tag));

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

    @Transactional
    public void joinMeeting(Long userId, String inviteCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Meeting meeting = meetingRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new IllegalArgumentException("올바르지 않은 초대코드 입니다."));

        Optional<Participant> isExistedUser = participantRepository.findByMeetingAndUser(meeting, user);
        if (isExistedUser.isPresent()) {
            throw new IllegalArgumentException("이미 참여한 사용자입니다.");
        } else {
            Participant participant = Participant.builder()
                    .user(user)
                    .meeting(meeting)
                    .build();
            participantRepository.save(participant);
        }
    }

    public List<TagDto> findTag() {
        List<Tag> tagList = tagRepository.findAll();
        List<TagDto> tagDtoList = tagList.stream()
                .map(tag -> TagDto.of(tag))
                .collect(Collectors.toList());

        return tagDtoList;
    }

    public List<MeetingInProgressResDto> findMeetingInProgress(Long userId) {
        List<MeetingInProgressResDto> meetingInProgressResDtoList = new ArrayList<>();

        // user가 참여 중인 Meeting List
        List<Meeting> meetingList = participantRepository.findMeetingByUserAndIsDone(userId, false);
        for (Meeting meeting : meetingList) {

            // 참여자 목록
            List<Participant> participantList = participantRepository.findByMeeting(meeting);
            List<ParticipantDto> participantDtoList = participantList.stream()
                    .map(participantDto -> ParticipantDto.of(participantDto))
                    .collect(Collectors.toList());

            // 참여자 수
            int participantCnt = participantList.size();

            // 모임에 해당하는 태그
            List<TagMeeting> tagMeetingList = tagMeetingRepository.findTagMeetingByMeeting
                    (meeting);
            List<TagDto> tagDtoList = tagMeetingList.stream()
                    .map(tagMeeting -> TagDto.of(tagMeeting.getTag()))
                    .collect(Collectors.toList());

            meetingInProgressResDtoList.add(MeetingInProgressResDto.builder()
                    .meeting(meeting)
                    .tag(tagDtoList)
                    .baseUrl(baseUrl)
                    .participant(participantDtoList)
                    .participantCnt(participantCnt)
                    .build());
        }

        return meetingInProgressResDtoList;
    }

    public List<MeetingCalenderResDto> findMeetingCalender(Long userId, Long meetingId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        return answerRepository.findMeetingCalender(user, meeting);
    }


    public List<MeetingResultDto> findMeetingResultList(Long userId, Pageable pageable) {
        List<MeetingResultDto> meetingResultDtoList = new ArrayList<>();

        // user가 참여 완료 한 Meeting List
        List<Meeting> meetingList = participantRepository.findFinisihedMeetingByUser(
                userId,
                pageable);

        for (Meeting meeting : meetingList) {
            // 참여자 목록 가져오기
            List<Participant> participantList = participantRepository.findByMeeting(meeting);

            // List<Participant> -> List<ParticipantDto>
            List<ParticipantDto> participantDtoList = participantList.stream()
                    .map(participantDto -> ParticipantDto.of(participantDto))
                    .collect(Collectors.toList());

            // 참여자 수
            int participantCnt = participantList.size();

            // 모임에 해당하는 태그 가져오기
            List<TagMeeting> tagMeetingList = tagMeetingRepository.findTagMeetingByMeeting
                    (meeting);

            // List<TagMeeting> -> List<TagDto>
            List<TagDto> tagDtoList = tagMeetingList.stream()
                    .map(tagMeeting -> TagDto.of(tagMeeting.getTag()))
                    .collect(Collectors.toList());

            // 반환 List에 추가
            meetingResultDtoList.add(MeetingResultDto.builder()
                    .meeting(meeting)
                    .tag(tagDtoList)
                    .participant(participantDtoList)
                    .participantCnt(participantCnt)
                    .build());
        }
        return meetingResultDtoList;
    }

    public MeetingInviteUrlDto findMeetingInviteUrl(Long meetingId) {

        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        return MeetingInviteUrlDto.builder()
                .meetingId(meeting.getId())
                .inviteUrl(baseUrl + meeting.getInviteCode())
                .build();
    }

    public MeetingChatDto findMeetingChat(Long userId, Long meetingId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // 참여자 수
        int participantCnt = participantRepository.findByMeeting(meeting).size();

        // 모임에 해당하는 태그 가져오기
        List<TagMeeting> tagMeetingList = tagMeetingRepository.findTagMeetingByMeeting(meeting);
        List<TagDto> tagDtoList = tagMeetingList.stream()
                .map(tagMeeting -> TagDto.of(tagMeeting.getTag()))
                .collect(Collectors.toList());

        // 내가 답변한 날의 Question 목록
        List<Question> questionList = answerRepository.findMeetingQuestion(user, meeting);
        List<ChatDto> chatDtoList = new ArrayList<>();
        for (Question question : questionList) {
            List<AnswerDto> answerDtoList = answerRepository.findMeetingChatResult(meeting, question, userId);
            ChatDto chatDto = ChatDto.builder()
                    .question(question)
                    .answer(answerDtoList)
                    .build();
            chatDtoList.add(chatDto);
        }

        return MeetingChatDto.builder()
                .meeting(meeting)
                .participantCnt(participantCnt)
                .tag(tagDtoList)
                .chat(chatDtoList)
                .build();
    }

    public MeetingAwardDto findMeetingAward(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // 해당 Meeting에 해당하는 모든 통계 가져오기
        List<AwardUserDto> awardUserDtoList = awardRepository.findAwardUser(meeting);
        MeetingAwardDto meetingAwardDto = new MeetingAwardDto();
        for (AwardUserDto awardUserDto : awardUserDtoList) {
            AwardType awardType = awardUserDto.getAwardType();
            if (awardType == AwardType.TALETELLER) {
                meetingAwardDto.addTaleteller(awardUserDto);
            } else if (awardType == AwardType.PHTOGRAPHER) {
                meetingAwardDto.addPhotographer(awardUserDto);
            } else if (awardType == AwardType.PERFECTATTENDANCE) {
                meetingAwardDto.addPerfectAttendance(awardUserDto);
            }
        }

        return meetingAwardDto;
    }
}
