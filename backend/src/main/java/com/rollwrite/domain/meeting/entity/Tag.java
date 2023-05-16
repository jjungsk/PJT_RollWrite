package com.rollwrite.domain.meeting.entity;

import com.rollwrite.global.model.BaseTimeEntity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String content;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<TagMeeting> tagMeetingList = new ArrayList<>();

    public void updateContent(String content) {
        this.content = content;
    }

    @Builder
    public Tag(String content) {
        this.content = content;
    }
}