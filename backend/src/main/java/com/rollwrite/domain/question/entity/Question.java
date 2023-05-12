package com.rollwrite.domain.question.entity;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 40)
    private String content;

    @NotNull
    @Column(length = 15)
    private String emoji;

    @Column
    private LocalDateTime expireTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    @Builder
    public Question(String content, String emoji, LocalDateTime expireTime, Meeting meeting) {
        this.content = content;
        this.emoji = emoji;
        this.expireTime = expireTime;
        this.meeting = meeting;
    }
}
