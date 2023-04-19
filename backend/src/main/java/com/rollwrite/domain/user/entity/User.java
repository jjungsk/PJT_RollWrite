package com.rollwrite.domain.user.entity;

import com.rollwrite.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 200)
    private String identifier;

    @NotNull
    @Column(length = 15)
    private String nickname;

    @NotNull
    @Column(length = 2083)
    private String profileImage;
}