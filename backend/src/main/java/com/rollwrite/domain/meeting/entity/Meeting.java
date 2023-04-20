package com.rollwrite.domain.meeting.entity;

import com.rollwrite.domain.meeting.dto.AddMeetingRequestDto;
import com.rollwrite.global.model.BaseTimeEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String title;

    @Column
    private LocalDate startDay;

    @Column
    private LocalDate endDay;

    @Column(length = 7)
    private String color;

    @Column(length = 2083, unique = true)
    private String inviteCode;

//    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
//    private List<QuestionParticipant> questionParticipantList = new ArrayList<>();

    @Builder
    public Meeting(Long id, AddMeetingRequestDto addMeetingRequestDto,String inviteCode) {
        this.id = id;
        this.title = addMeetingRequestDto.getTitle();
        this.startDay = addMeetingRequestDto.getStartDay();
        this.endDay = addMeetingRequestDto.getEndDay();
        this.color = addMeetingRequestDto.getColor();
        this.inviteCode = inviteCode;
    }
}
