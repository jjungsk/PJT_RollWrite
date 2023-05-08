package com.rollwrite.domain.question.entity;

import com.rollwrite.domain.meeting.entity.Meeting;
import com.rollwrite.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionGpt extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 40)
    private String content;

    @Column
    @ColumnDefault("false")
    private boolean isChoosed;

    @NotNull
    @Column(length = 15)
    private String emoji;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    public void updateIsChoosed(boolean isChoosed) {
        this.isChoosed = isChoosed;
    }

    @Builder
    public QuestionGpt(Long id, String content, boolean isChoosed, String emoji, Meeting meeting) {
        this.id = id;
        this.content = content;
        this.isChoosed = isChoosed;
        this.emoji = emoji;
        this.meeting = meeting;
    }
}