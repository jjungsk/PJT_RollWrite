package com.rollwrite.domain.admin.service;

import com.rollwrite.domain.admin.dto.*;
import com.rollwrite.domain.meeting.dto.MeetingResultDto;
import com.rollwrite.domain.meeting.dto.ParticipantDto;
import com.rollwrite.domain.meeting.dto.TagDto;
import com.rollwrite.domain.notice.entity.Notice;
import com.rollwrite.domain.notice.repository.NoticeRepository;
import com.rollwrite.domain.inquiry.entity.Inquiry;
import com.rollwrite.domain.inquiry.repository.InquiryRepository;
import com.rollwrite.domain.meeting.entity.*;
import com.rollwrite.domain.meeting.repository.MeetingRepository;
import com.rollwrite.domain.meeting.repository.TagRepository;
import com.rollwrite.domain.meeting.service.MeetingService;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.question.entity.QuestionGpt;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import com.rollwrite.domain.question.repository.QuestionGptRepository;
import com.rollwrite.domain.question.repository.QuestionParticipantRepository;
import com.rollwrite.domain.question.repository.QuestionRepository;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.entity.UserType;
import com.rollwrite.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final MeetingService meetingService;

    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;
    private final MeetingRepository meetingRepository;
    private final InquiryRepository inquiryRepository;
    private final QuestionRepository questionRepository;
    private final QuestionGptRepository questionGptRepository;
    private final QuestionParticipantRepository questionParticipantRepository;

    @Transactional
    public void addNotice(Long userId, AddNoticeReqDto addNoticeReqDto) {
        // 공지의 제목 길이가 30글자를 넘었을 때
        if (addNoticeReqDto.getTitle().getBytes(StandardCharsets.ISO_8859_1).length > 30) {
            throw new IllegalArgumentException("공지 제목이 글자 수를 초과했습니다");
        }

        // 공지의 문장 길이가 400글자를 넘었을 때
        if (addNoticeReqDto.getContent().getBytes(StandardCharsets.ISO_8859_1).length > 400) {
            throw new IllegalArgumentException("공지 내용이 글자 수를 초과했습니다");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // notice insert
        Notice notice = Notice.builder()
                .title(addNoticeReqDto.getTitle())
                .content(addNoticeReqDto.getContent())
                .user(user)
                .build();
        noticeRepository.save(notice);
    }

    @Transactional
    public void modifyNotice(Long noticeId, AddNoticeReqDto addNoticeReqDto) {
        // 공지의 제목 길이가 30글자를 넘었을 때
        if (addNoticeReqDto.getTitle().getBytes(StandardCharsets.ISO_8859_1).length > 30) {
            throw new IllegalArgumentException("공지 제목이 글자 수를 초과했습니다");
        }

        // 공지의 문장 길이가 400글자를 넘었을 때
        if (addNoticeReqDto.getContent().getBytes(StandardCharsets.ISO_8859_1).length > 400) {
            throw new IllegalArgumentException("공지 내용이 글자 수를 초과했습니다");
        }

        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지를 찾을 수 없습니다"));

        notice.updateNotice(addNoticeReqDto);
    }

    @Transactional
    public void removeNotice(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지를 찾을 수 없습니다"));

        noticeRepository.delete(notice);
    }

    public List<FindUserResDto> findUser(String type) {
        if (!"admin".equals(type) && !"user".equals(type)) {
            throw new IllegalArgumentException("잘못된 user type입니다.");
        }

        UserType userType = UserType.USER;
        if ("admin".equals(type)) {
            userType = UserType.ADMIN;
        }

        List<User> userList = userRepository.findAllByType(userType);

        return userList.stream().map(user -> FindUserResDto.builder()
                .user(user)
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public void modifyUserType(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        if (user.getType().equals(UserType.ADMIN)) {
            user.updateUserType(UserType.USER);
        } else {
            user.updateUserType(UserType.ADMIN);
        }
    }

    public List<FindTagResDto> findTag() {
        List<Tag> tagList = tagRepository.findAll();

        return tagList.stream().map(tag -> FindTagResDto.builder()
                .tag(tag)
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public void addTag(String content) {
        // 태그의 길이가 10글자를 넘었을 때
        if (content.getBytes(StandardCharsets.ISO_8859_1).length > 10) {
            throw new IllegalArgumentException("태그 내용이 글자 수를 초과했습니다");
        }

        // tag insert
        Tag tag = Tag.builder()
                .content(content)
                .build();
        tagRepository.save(tag);
    }

    @Transactional
    public void modifyTag(Long tagId, String content) {
        // 태그의 길이가 10글자를 넘었을 때
        if (content.getBytes(StandardCharsets.ISO_8859_1).length > 10) {
            throw new IllegalArgumentException("태그 내용이 글자 수를 초과했습니다");
        }

        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new IllegalArgumentException("태그를 찾을 수 없습니다"));

        tag.updateContent(content);
    }

    public List<MeetingResultDto> findMeeting() {
        List<MeetingResultDto> meetingResultDtoList = new ArrayList<>();

        List<Meeting> meetingList = meetingRepository.findAll();

        for (Meeting meeting : meetingList) {
            // List<Participant> -> List<ParticipantDto>
            List<ParticipantDto> participantDtoList = meeting.getParticipantList().stream()
                    .map(participant -> ParticipantDto.of(participant))
                    .collect(Collectors.toList());

            // 참여자 수
            int participantCnt = participantDtoList.size();

            // List<TagMeeting> -> List<TagDto>
            List<TagDto> tagDtoList = meeting.getTagMeetingList().stream()
                    .map(tagMeeting -> TagDto.of(tagMeeting.getTag()))
                    .collect(Collectors.toList());

            meetingResultDtoList.add(MeetingResultDto.builder()
                    .meeting(meeting)
                    .tag(tagDtoList)
                    .participant(participantDtoList)
                    .participantCnt(participantCnt)
                    .build());
        }
        return meetingResultDtoList;
    }

    @Transactional
    public void addTodayQuestion(Long meetingId) {
        // Meeting
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new IllegalArgumentException("모임을 찾을 수 없습니다"));

        // 만들어진 질문이 있는지 확인
        Optional<Question> questionOptional = questionRepository.findQuestionByMeetingAndExpireTime(meetingId);
        if (questionOptional.isPresent()) {
            throw new IllegalArgumentException("이미 질문이 있습니다.");
        }

        // 마지막 날이면 통계 내기 + 고정 질문
        if (meeting.getEndDay().equals(LocalDate.now())) {
            meetingService.makeAward(meeting);
            // 사용안한 chatGpt 질문 삭제
            questionGptRepository.deleteQuestionNotUsedByMeeting(meeting);
            return;
        }

        // 해당 모임에서 질문을 한 참여자 중 랜덤 한 명
        // SELECT qp.user.id FROM QuestionParticipant qp WHERE qp.meeting.id = :meetingId AND qp.isChoosed = false GROUP BY qp.user ORDER BY RAND()
        Optional<Long> participantId = questionParticipantRepository.chooseRandomParticipant(meetingId, false);

        String content = "";
        String emoji = "";

        if (participantId.isEmpty()) {
            // 참여자가 없으면
            // 해당 모임에 만들어진 gpt 질문 중 랜덤 하나
            // SELECT qg FROM QuestionGpt qg WHERE qg.meeting.id = :meetingId AND qg.isChoosed = false ORDER BY RAND()
            Optional<QuestionGpt> questionGptOptional = questionGptRepository.chooseRandomQuestionGpt(meetingId, false);

            // gpt 질문이 없을 때
            if (questionGptOptional.isEmpty()) {
                throw new IllegalArgumentException("gpt 질문이 없습니다");
            }

            // 해당 gpt 질문을 isChoosed = true로 업데이트
            QuestionGpt questionGpt = questionGptOptional.get();
            questionGpt.updateIsChoosed(true);

            // question, emoji 업데이트
            content = questionGpt.getContent();
            emoji = questionGpt.getEmoji();

        } else {
            // 참여자가 있으면
            // 해당 모임에 만들어진 당첨된 참여자 질문 중 랜덤 하나
            // SELECT qp FROM QuestionParticipant qp WHERE qp.meeting.id = :meetingId AND qp.isChoosed = false AND qp.user.id = :userId ORDER BY RAND()
            Optional<QuestionParticipant> questionParticipantOptional = questionParticipantRepository.chooseRandomQuestionParticipant(meetingId, false, participantId.get());

            // 참여자 질문이 없을 때
            if (questionParticipantOptional.isEmpty()) {
                throw new IllegalArgumentException("참여자 질문이 없습니다");
            }

            // 해당 참여자 질문을 isChoosed = true로 업데이트
            QuestionParticipant questionParticipant = questionParticipantOptional.get();
            questionParticipant.updateIsChoosed(true);

            // question, emoji 업데이트
            content = questionParticipant.getContent();
            emoji = questionParticipant.getEmoji();
        }

        // 다음날 오전 8시
        LocalDateTime expireTime = LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(8, 0));

        // question insert
        Question question = Question.builder()
                .content(content)
                .emoji(emoji)
                .meeting(meeting)
                .expireTime(expireTime)
                .build();
        questionRepository.save(question);
    }

    public List<FindInquiryResDto> findInquiry() {
        List<Inquiry> inquiryList = inquiryRepository.findAll();

        return inquiryList.stream().map(inquiry -> FindInquiryResDto.builder()
                .inquiry(inquiry)
                .build()).collect(Collectors.toList());
    }
}
