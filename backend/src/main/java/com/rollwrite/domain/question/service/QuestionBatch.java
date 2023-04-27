package com.rollwrite.domain.question.service;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.domain.meeting.repository.MeetingRepository;
import com.rollwrite.domain.meeting.repository.ParticipantRepository;
import com.rollwrite.domain.question.entity.Question;
import com.rollwrite.domain.question.entity.QuestionGpt;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import com.rollwrite.domain.question.repository.QuestionGptRepository;
import com.rollwrite.domain.question.repository.QuestionParticipantRepository;
import com.rollwrite.domain.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class QuestionBatch {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;

    private final MeetingRepository meetingRepository;
    private final QuestionRepository questionRepository;
    private final ParticipantRepository participantRepository;
    private final QuestionGptRepository questionGptRepository;
    private final QuestionParticipantRepository questionParticipantRepository;

    @Bean
    public Job questionJob() {
        return jobBuilderFactory.get("questionJob")
                // 진행 중인 모임이 없으면 끝
                .start(meetingInProgressStep())
                .on("FAILED")
                .end()

                // 진행 중인 모임이 있으면 모임 아이디 리스트 저장
                .from(meetingInProgressStep())
                .on("COMPLETED")
                .to(setMeetingIdStep())
                .next(selectQuestionStep())

                // 질문 채택
                .from(selectQuestionStep())
                .on("*")
                .to(finishStep())
                .end()

                .build();
    }

    @Bean
    public Step meetingInProgressStep() {
        return stepBuilderFactory.get("meetingInProgressStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info("meetingInProgressStep!");

                    // 진행 중인 모임 리스트
                    // SELECT DISTINCT p.meeting.id FROM Participant p WHERE p.isDone = false
                    List<Long> meetingIdList = participantRepository.findMeetingByIsDone(false);
                    log.info("진행 중인 모임 리스트 meetingIdList : " + meetingIdList);

                    if (!meetingIdList.isEmpty()) {
                        ExecutionContext executionContext = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext();
                        executionContext.put("meetingIdList", meetingIdList);
                        contribution.setExitStatus(ExitStatus.COMPLETED);
                    } else {
                        contribution.setExitStatus(ExitStatus.FAILED);
                    }
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step setMeetingIdStep() {
        return stepBuilderFactory.get("setMeetingIdStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info("setMeetingIdStep!");
                    ExecutionContext executionContext = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext();
                    List<Long> meetingIdList = (List<Long>) executionContext.get("meetingIdList");

                    // 반복문으로 meetingId 저장
                    int idx = 0;
                    for (Long meetingId : meetingIdList) {
                        log.info("meetingId 저장 : " + meetingId);
                        executionContext.put("meetingId" + idx, meetingId);
                        idx++;
                    }

                    // 시작 idx 저장
                    executionContext.put("idx", 0);
                    contribution.setExitStatus(ExitStatus.COMPLETED);
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step selectQuestionStep() {
        return stepBuilderFactory.get("selectQuestionStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info("selectQuestionStep!");
                    ExecutionContext executionContext = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext();
                    int idx = (int) executionContext.get("idx");
                    Long meetingId = (Long) executionContext.get("meetingId" + idx);
                    log.info("현재 meetingId : " + meetingId);

                    // 더 이상 진행 중인 모임이 없다면 끝
                    if (meetingId == null) {
                        return RepeatStatus.FINISHED;
                    }

                    // 해당 모임에서 질문을 한 참여자 중 랜덤 한 명
                    // SELECT qp.user.id FROM QuestionParticipant qp WHERE qp.meeting.id = :meetingId AND qp.isChoosed = false GROUP BY qp.user ORDER BY RAND()
                    Optional<Long> participantId = questionParticipantRepository.findRandomUserByMeetingAndIsChoosed(meetingId, false);

                    String content = "";
                    String emoji = "";

                    if (participantId.isEmpty()) {
                        // 참여자가 없으면
                        // 해당 모임에 만들어진 gpt 질문 중 랜덤 하나
                        // SELECT qg FROM QuestionGpt qg WHERE qg.meeting.id = :meetingId AND qg.isChoosed = false ORDER BY RAND()
                        Optional<QuestionGpt> questionGptOptional = questionGptRepository.findRandomByMeetingAndIsChoosed(meetingId, false);

                        // gpt 질문이 없으면 다음 모임으로 넘어감
                        if (questionGptOptional.isEmpty()) {
                            executionContext.remove("idx");
                            executionContext.put("idx", idx + 1);
                            return RepeatStatus.CONTINUABLE;
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
                        Optional<QuestionParticipant> questionParticipantOptional = questionParticipantRepository.findRandomByMeetingAndIsChoosedAndUser(meetingId, false, participantId.get());

                        // 참여자 질문이 없으면 다음 모임으로 넘어감
                        if (questionParticipantOptional.isEmpty()) {
                            executionContext.remove("idx");
                            executionContext.put("idx", idx + 1);
                            return RepeatStatus.CONTINUABLE;
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

                    // Meeting
                    Optional<Meeting> meetingOptional = meetingRepository.findById(meetingId);

                    // Meeting이 없으면
                    if (meetingOptional.isEmpty()) {
                        executionContext.remove("idx");
                        executionContext.put("idx", idx + 1);
                        return RepeatStatus.CONTINUABLE;
                    }
                    Meeting meeting = meetingOptional.get();

                    // question insert
                    Question question = Question.builder()
                            .content(content)
                            .emoji(emoji)
                            .meeting(meeting)
                            .expireTime(expireTime)
                            .build();
                    questionRepository.save(question);

                    // 다음 모임으로 넘어감
                    executionContext.remove("idx");
                    executionContext.put("idx", idx + 1);
                    return RepeatStatus.CONTINUABLE;
                })
                .build();
    }

    @Bean
    public Step finishStep() {
        return stepBuilderFactory.get("finishStep")
                .tasklet((contribution, chunkContext) -> {
                    log.info("finishStep!");
                    contribution.setExitStatus(ExitStatus.COMPLETED);
                    return RepeatStatus.FINISHED;
                })
                .build();
    }
}