package com.rollwrite.global.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SuccessCode {

    // test
    TEST(StatusCode.SUCCESS, "테스트 중입니다."),

    // notice
    FIND_NOTICE_SUCCESS(StatusCode.SUCCESS, "공지 목록을 조회했습니다."),

    // admin
    ADD_NOTICE_SUCCESS(StatusCode.SUCCESS, "공지가 생성되었습니다."),
    MODIFY_NOTICE_SUCCESS(StatusCode.SUCCESS, "공지가 수정되었습니다."),
    REMOVE_NOTICE_SUCCESS(StatusCode.SUCCESS, "공지가 삭제되었습니다."),
    FIND_TAG_SUCCESS(StatusCode.SUCCESS, "태그 목록을 조회했습니다."),
    ADD_TAG_SUCCESS(StatusCode.SUCCESS, "태그가 생성되었습니다."),
    MODIFY_TAG_SUCCESS(StatusCode.SUCCESS, "태그가 수정되었습니다."),
    FIND_MEETING_SUCCESS(StatusCode.SUCCESS, "모임 목록을 조회했습니다."),
    FIND_INQUIRY_SUCCESS(StatusCode.SUCCESS, "문의 목록을 조회했습니다."),

    // inquiry
    ADD_INQUIRY_SUCCESS(StatusCode.SUCCESS, "문의가 생성되었습니다."),

    // user
    SIGNUP_SUCCESS(StatusCode.SUCCESS, "회원가입 완료되었습니다."),
    LOGIN_SUCCESS(StatusCode.SUCCESS, "로그인 완료되었습니다."),
    REISSUE_SUCCESS(StatusCode.SUCCESS, "accessToken 재발급이 완료되었습니다."),
    FIND_USER_SUCCESS(StatusCode.SUCCESS, "유저 조회가 완료되었습니다."),
    MODIFY_USER_SUCCESS(StatusCode.SUCCESS, "유저 정보가 정상 변경되었습니다."),
    REMOVE_USER_PROFILE_SUCCESS(StatusCode.SUCCESS, "유저 프로필 이미지가 정상 삭제 되었습니다."),
    LOGOUT_SUCCESS(StatusCode.SUCCESS, "로그아웃 되었습니다."),
    REMOVE_USER_SUCCESS(StatusCode.SUCCESS, "회원 정보가 삭제 되었습니다."),
    FIND_ROLE_SUCCESS(StatusCode.SUCCESS, "토큰의 role 조회가 완료되었습니다."),

    // meeting
    GET_MEETING_IN_PROGRESS_SUCCESS(StatusCode.SUCCESS, "진행 중인 전체 모임 조회했습니다."),
    GET_MEETING_CALENDER_SUCCESS(StatusCode.SUCCESS, "진행 중인 모임 캘린더 조회했습니다."),
    GET_MEETING_INVITE_URL_SUCCESS(StatusCode.SUCCESS, "모임 초대 링크를 조회했습니다."),
    ADD_MEETING_SUCCESS(StatusCode.SUCCESS, "모임이 생성되었습니다."),
    JOIN_MEETING_SUCCESS(StatusCode.SUCCESS, "모임에 가입되었습니다."),
    GET_MEETING_RESULT_SUCCESS(StatusCode.SUCCESS, "전체 모임 결과 조회했습니다."),
    GET_MEETING_CHAT_SUCCESS(StatusCode.SUCCESS, "모임 채팅 결과 조회했습니다."),
    GET_MEETING_AWARD_SUCCESS(StatusCode.SUCCESS, "모임 통계 결과 조회했습니다."),
    GET_MEETING_DETAIL_RESULT_SUCCESS(StatusCode.SUCCESS, "모임 상세 결과 조회했습니다."),
    GET_TAG_SUCCESS(StatusCode.SUCCESS, "태그를 가져왔습니다."),
    GET_PARTICIPANT_SUCCESS(StatusCode.SUCCESS, "참여자 목록을 가져왔습니다."),
    GET_RANDOM_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변 뽑기를 진행 했습니다."),

    // question
    ADD_QUESTION_SUCCESS(StatusCode.SUCCESS, "질문이 생성되었습니다."),
    ADD_TODAY_QUESTION_SUCCESS(StatusCode.SUCCESS, "오늘의 질문이 생성되었습니다."),
    ADD_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 생성되었습니다."),
    MODIFY_ANSWER_SUCCESS(StatusCode.SUCCESS, "답변이 수정되었습니다."),
    FIND_TODAY_QUESTION_SUCCESS(StatusCode.SUCCESS, "오늘 질문 목록을 조회했습니다."),
    FIND_QUESTION_SUCCESS(StatusCode.SUCCESS, "질문 목록을 조회했습니다."),
    REMOVE_ANSWER_IMAGE_SUCCESS(StatusCode.SUCCESS, "답변 이미지가 삭제되었습니다."),

    // notification
    MODIFY_FCM_TOKEN_SUCCESS(StatusCode.SUCCESS, "FCM Token이 정상 갱신 되었습니다."),
    SEND_MESSAGE_TO(StatusCode.SUCCESS, "알림을 성공적으로 보냈습니다."),
    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getHttpStatusCode();
    }
}