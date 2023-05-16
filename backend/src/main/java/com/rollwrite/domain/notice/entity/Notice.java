package com.rollwrite.domain.notice.entity;

import com.rollwrite.domain.admin.dto.AddNoticeReqDto;
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
public class Notice extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 30)
    private String title;

    @NotNull
    @Column(length = 400)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void updateNotice(AddNoticeReqDto addNoticeReqDto) {
        this.title = addNoticeReqDto.getTitle();
        this.content = addNoticeReqDto.getContent();
    }

    @Builder
    public Notice(String title, String content, User user) {
        this.title = title;
        this.content = content;
        this.user = user;
    }
}
