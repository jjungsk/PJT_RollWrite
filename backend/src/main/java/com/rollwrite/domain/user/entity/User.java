package com.rollwrite.domain.user.entity;

import com.rollwrite.domain.notice.entity.Notice;
import com.rollwrite.domain.inquiry.entity.Inquiry;
import com.rollwrite.domain.meeting.entity.Participant;
import com.rollwrite.domain.meeting.entity.Award;
import com.rollwrite.domain.notification.entity.Alarm;
import com.rollwrite.domain.notification.entity.Notification;
import com.rollwrite.domain.question.entity.Answer;
import com.rollwrite.domain.question.entity.QuestionParticipant;
import com.rollwrite.global.model.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Main User Entity
 */
@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    public static Long POINT = 10L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 200)
    private String identifier;

    @NotNull
    @Column(length = 15)
    private String nickname;

    @Column(length = 2083)
    private String profileImage;

    @Column(length = 2083)
    private String firebaseToken;

    @Column
    @ColumnDefault("0")
    private Long point;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private UserType type;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Participant> participantList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Award> awardList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<QuestionParticipant> questionParticipantList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notificationiList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Inquiry> inquiryList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Alarm> alarmList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notice> noticeList = new ArrayList<>();

    @Builder
    public User(String identifier, String nickname, String profileImage, UserType type) {
        this.identifier = identifier;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.type = type;
    }

    public void update(String nickname, String profileImage) {
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public void updateToken(String firebaseToken) {
        this.firebaseToken = firebaseToken;
    }

    public void updateUserType(UserType userType) {
        this.type = userType;
    }

    public void updatePoint(Long point) { this.point = point; }

}