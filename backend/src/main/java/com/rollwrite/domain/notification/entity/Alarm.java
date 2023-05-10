package com.rollwrite.domain.notification.entity;

import com.rollwrite.domain.user.entity.User;
import com.rollwrite.global.model.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firebaseToken;

    @Column
    @ColumnDefault("true")
    private boolean isAllowed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Alarm(String firebaseToken, boolean isAllowed, User user) {
        this.firebaseToken = firebaseToken;
        this.isAllowed = isAllowed;
        this.user = user;
    }

    public void updateToken(String firebaseToken, boolean isAllowed) {
        this.firebaseToken = firebaseToken;
        this.isAllowed = isAllowed;
    }

}
