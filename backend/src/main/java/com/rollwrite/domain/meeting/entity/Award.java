package com.rollwrite.domain.meeting.entity;

import com.rollwrite.domain.user.entity.User;
import com.rollwrite.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Award extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private AwardType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @Builder
    public Award(AwardType type, User user, Meeting meeting) {
        this.type = type;
        this.user = user;
        this.meeting = meeting;
    }
}
