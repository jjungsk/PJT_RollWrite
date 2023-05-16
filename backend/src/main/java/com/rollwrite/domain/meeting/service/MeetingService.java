package com.rollwrite.domain.meeting.service;

import com.rollwrite.domain.meeting.dto.*;
import com.rollwrite.domain.meeting.entity.*;
import com.rollwrite.domain.meeting.repository.*;
import com.rollwrite.domain.question.dto.AnswerLengthSumDto;
import com.rollwrite.domain.question.dto.AnswerRecordDto;
import com.rollwrite.domain.question.dto.ImageCountDto;
import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.question.repository.AnswerRepository;
import com.rollwrite.domain.question.repository.QuestionRepository;
import com.rollwrite.domain.user.dto.FindUserResDto;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import com.rollwrite.global.exception.FakeException;
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

    private final AsyncMeetingService asyncMeetingService;

    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final AwardRepository awardRepository;
    private final AnswerRepository answerRepository;
    private final MeetingRepository meetingRepository;
    private final QuestionRepository questionRepository;
    private final TagMeetingRepository tagMeetingRepository;
    private final ParticipantRepository participantRepository;

    @Value("${inviteUrl}")
    private String baseUrl;

    @Transactional
    public AddMeetingResDto addMeeting(Long userId,
                                       AddMeetingReqDto addMeetingReqDto) throws NoSuchAlgorithmException {

        LocalDate startDay = addMeetingReqDto.getStartDay();
        LocalDate endDay = addMeetingReqDto.getEndDay();
        LocalDate today = LocalDate.now();

        // 시작일이 오늘 이전
        if (startDay.isBefore(today)) {
            throw new IllegalArgumentException("시작일이 오늘 이전입니다.");
        }

        // 3일 이내인 경우
        long period = ChronoUnit.DAYS.between(startDay, endDay);
        if (period < 2) {
            throw new IllegalArgumentException("3일 이상의 모임을 생성하세요.");
        }
        if (period > 31) {
            throw new IllegalArgumentException("31일 이하의 모임을 생성하세요.");
        }

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
                .addMeetingReqDto(addMeetingReqDto)
                .inviteCode(inviteCode)
                .build();
        meetingRepository.save(meeting);

        // tag id에 해당하는 Meeting(tagMeetingList)에 추가
        List<TagDto> tagList = new ArrayList<>();
        List<TagMeeting> tagMeetingList = tagIdToTagMeetingList(
                meeting, addMeetingReqDto.getTag(), tagList);
        meeting.updateTagMeetingList(tagMeetingList);

        // 질문에 사용 될 Tag
        String tag = "";
        for (TagDto tagDto : tagList) {
            tag += tagDto.getContent() + ",";
        }

        // 오늘 시작하는 모임의 경우 ChatGPT 질문 1개 먼저 만들어주기
        // Chat GPT 생성 질문 period개 저장
        if (startDay.isEqual(today)) {
            // Chat GPT 오늘 질문 생성
            asyncMeetingService.saveTodayGptQuestion(tag, meeting);

            asyncMeetingService.saveGptQuestion(tag, meeting, period - 1);
        } else {
            asyncMeetingService.saveGptQuestion(tag, meeting, period);
        }

        // Meeting 생성자 Meeting에 추가
        Participant participant = Participant.builder()
                .user(user)
                .meeting(meeting)
                .build();
        participantRepository.save(participant);

        return AddMeetingResDto.builder()
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
    public int joinMeeting(Long userId, String inviteCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Optional<Meeting> optionalMeeting = meetingRepository.validMeetingInviteCode(inviteCode);
        if (!optionalMeeting.isPresent()) {
            return 1;
        }
        Meeting meeting = optionalMeeting.get();

        Optional<Participant> isExistedUser = participantRepository.findByMeetingAndUser(meeting, user);
        if (isExistedUser.isPresent()) {
            return 2;
        } else {
            Participant participant = Participant.builder()
                    .user(user)
                    .meeting(meeting)
                    .build();
            participantRepository.save(participant);
            return 0;
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

        List<MeetingCalenderResDto> meetingCalenderResDtoList = new ArrayList<>();

        // 모임의 참여자 수
        int participantCnt = meeting.getParticipantList().size();

        // 답변 리스트
        List<AnswerCountDto> answerCountDtoList = answerRepository.findAnswerCnt(meeting);

        for (AnswerCountDto answerCountDto : answerCountDtoList) {
            String question = null;
            String answer = null;

            Optional<Answer> optionalAnswer = answerRepository.findByUserAndQuestion(user, answerCountDto.getQuestion());

            // 내가 단 답변이 있을 때
            if (optionalAnswer.isPresent()) {
                answer = optionalAnswer.get().getContent();
                question = answerCountDto.getQuestion().getContent();
            }

            meetingCalenderResDtoList.add(MeetingCalenderResDto.builder()
                    .day(answerCountDto.getQuestion().getCreatedAt().toLocalDate())
                    .question(question)
                    .answer(answer)
                    .answerCnt(Math.toIntExact(answerCountDto.getAnswerCount()))
                    .participantCnt(participantCnt)
                    .build());
        }
        return meetingCalenderResDtoList;
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
        Meeting meeting = participantRepository.findMeetingByUserAndMeetingAndIsDone(userId, meetingId, true)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // 참여자 수
        int participantCnt = participantRepository.findByMeeting(meeting).size();

        // 모임에 해당하는 태그 가져오기
        List<TagMeeting> tagMeetingList = tagMeetingRepository.findTagMeetingByMeeting(meeting);
        List<TagDto> tagDtoList = tagMeetingList.stream()
                .map(tagMeeting -> TagDto.of(tagMeeting.getTag()))
                .collect(Collectors.toList());

        // Question 목록
        List<Question> questionList = questionRepository.findByMeeting(meeting);
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

    public List<MeetingAwardDto> findMeetingAward(Long userId, Long meetingId) {
        Meeting meeting = participantRepository.findMeetingByUserAndMeetingAndIsDone(userId, meetingId, true)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // 해당 Meeting에 해당하는 모든 통계 가져오기
        List<MeetingAwardDto> meetingAwardDtoList = awardRepository.findAwardUser(meeting);

        // Type 별로 정렬
        Collections.sort(meetingAwardDtoList, new Comparator<MeetingAwardDto>() {
            @Override
            public int compare(MeetingAwardDto o1, MeetingAwardDto o2) {
                return o1.getType().compareTo(o2.getType());
            }
        });

        return meetingAwardDtoList;
    }

    public List<FindUserResDto> findParticipant(Long userId, Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        List<Participant> participantList = participantRepository.findByMeeting(meeting);

        Collections.sort(participantList, new Comparator<Participant>() {
            @Override
            public int compare(Participant o1, Participant o2) {
                // 나를 최우선으로
                if (o2.getUser().getId() == userId) {
                    return 1;
                } else {
                    // 닉네임 사전순
                    return o1.getUser().getNickname().compareTo(o2.getUser().getNickname());
                }
            }
        });

        //  List<Participant> -> List<FindUserResDto>
        return participantList.stream().map(participant -> FindUserResDto.builder()
                .userId(participant.getUser().getId())
                .nickname(participant.getUser().getNickname())
                .profileImage(participant.getUser().getProfileImage())
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public void makeAward(Meeting meeting) {
        // 답변 제일 길게 많이 한 사람
        List<AnswerLengthSumDto> answerLengthSumList = answerRepository.findAnswerLengthSumByMeeting(meeting);
        List<User> taleteller = new ArrayList<>();
        int maxLengthSum = Integer.MIN_VALUE;
        for (AnswerLengthSumDto answerLengthSum : answerLengthSumList) {
            User user = answerLengthSum.getUser();
            int length = answerLengthSum.getAnswerLengthSum();

            if (length >= maxLengthSum) {
                maxLengthSum = length;
                taleteller.add(user);
            } else {
                break;
            }
        }

        // 사진 제일 많이 올린 사람
        List<ImageCountDto> imageCountDtoList = answerRepository.findImageCountByMeeting(meeting);
        List<User> photographer = new ArrayList<>();
        Long maxImageCount = Long.MIN_VALUE;
        for (ImageCountDto imageCount : imageCountDtoList) {
            User user = imageCount.getUser();
            Long count = imageCount.getImageCount();

            if (count >= maxImageCount) {
                maxImageCount = count;
                photographer.add(user);
            } else {
                break;
            }
        }

        // 연속 답변 최고기록자
        // 1. 모임의 참가자 리스트
        List<Participant> participantList = participantRepository.findByMeeting(meeting);
        List<AnswerRecordDto> answerRecordDtoList = new ArrayList<>();

        for (Participant participant : participantList) {
            // 2. 참가자의 답변 리스트
            List<Answer> answerList = answerRepository.findAnswerByUserAndMeeting(participant.getUser(), meeting);

            // 3. 참가자의 최대 기록
            int curRecord = 0;
            int participantRecord = 0;
            for (int i = 1, size = answerList.size(); i < size; i++) {
                LocalDateTime prevTime = answerList.get(i - 1).getCreatedAt();
                LocalDateTime curTime = answerList.get(i).getCreatedAt();

                // 오전 8시 기준으로 날짜 보정
                LocalDate prevDay = prevTime.toLocalDate();
                LocalDate curDay = curTime.toLocalDate();

                if (prevTime.getHour() < 8) {
                    prevDay = prevTime.minusDays(1).toLocalDate();
                }

                if (curTime.getHour() < 8) {
                    curDay = curTime.minusDays(1).toLocalDate();
                }

                // 이전 답변과 지금 답변이 하루 차이나면 curRecord++, 그 이상이면 1로 초기화;
                long duration = ChronoUnit.DAYS.between(prevDay, curDay);
                if (duration > 1) {
                    curRecord = 0;
                } else {
                    if (++curRecord >= participantRecord) {
                        participantRecord = curRecord;
                    }
                }

            }
            answerRecordDtoList.add(AnswerRecordDto.builder()
                    .user(participant.getUser())
                    .answerRecord(participantRecord)
                    .build());
        }

        Collections.sort(answerRecordDtoList, new Comparator<>() {
            @Override
            public int compare(AnswerRecordDto o1, AnswerRecordDto o2) {
                // answerRecord 기준 내림차순
                int record1 = o1.getAnswerRecord();
                int record2 = o2.getAnswerRecord();
                if (record1 < record2) {
                    return 1;
                } else if (record1 > record2) {
                    return -1;
                }
                return 0;
            }
        });

        List<User> perfectAttendance = new ArrayList<>();
        int maxRecord = Integer.MIN_VALUE;
        for (AnswerRecordDto answerRecord : answerRecordDtoList) {
            User user = answerRecord.getUser();
            int record = answerRecord.getAnswerRecord();

            if (record >= maxRecord) {
                maxRecord = record;
                perfectAttendance.add(user);
            } else {
                break;
            }
        }

        // 충분히 긴 시간 9999-01-01 00:00:00.000000
        LocalDateTime infiniteTime = LocalDateTime.of(LocalDate.of(9999, 1, 1), LocalTime.MIN);

        // question insert
        Question question = Question.builder()
                .content("마지막으로 우리에 대해 하고 싶은 말이 뭐야?")
                .emoji("🎉")
                .meeting(meeting)
                .expireTime(infiniteTime)
                .build();
        questionRepository.save(question);

        // award insert - taleteller
        for (User user : taleteller) {
            Award award = Award.builder()
                    .type(AwardType.TALETELLER)
                    .meeting(meeting)
                    .user(user)
                    .build();
            awardRepository.save(award);
        }

        // award insert - photographer
        for (User user : photographer) {
            Award award = Award.builder()
                    .type(AwardType.PHOTOGRAPHER)
                    .meeting(meeting)
                    .user(user)
                    .build();
            awardRepository.save(award);
        }

        // award insert - PERFECTATTENDANCE
        for (User user : perfectAttendance) {
            Award award = Award.builder()
                    .type(AwardType.PERFECTATTENDANCE)
                    .meeting(meeting)
                    .user(user)
                    .build();
            awardRepository.save(award);
        }
    }

    @Transactional
    public MeetingRandomQuestionResDto getRandomAnswer(Long userId, MeetingRandomQuestionReqDto meetingRandomQuestionReqDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        Long point = user.getPoint();
        log.info("userId : {}, userPoint : {}", userId, point);

        // 가지고 있는 포인트가 1회 뽑기 포인트인 10 보다 작을 경우
        if (point < User.POINT) return null;

        // 랜덤 답변 뽑기
        Long meetingId = meetingRandomQuestionReqDto.getMeetingId();
        LocalDate localDate = meetingRandomQuestionReqDto.getFindDay();
        LocalTime localTime = LocalTime.of(8, 0, 0, 0);
        LocalDateTime localDateTime = LocalDateTime.of(localDate, localTime);
        log.info("localDateTime : {}", localDateTime);

        // 답변이 등록 되기 전이라면 (OK 200 코드 안에 StatusCode는 400)
        Answer answerRandom = answerRepository.findByMeetingIdAndUserIdAndCreatedAt(userId, meetingId, localDateTime)
                .orElseThrow(() -> new FakeException());

        log.info("answerRandom.getContent() : {}", answerRandom.getContent());
        // 답변을 정상적으로 뽑고 나서는 포인트 감소
        user.updatePoint(point - User.POINT);

        return MeetingRandomQuestionResDto.builder()
                .answer(answerRandom.getContent())
                .build();
    }

}
