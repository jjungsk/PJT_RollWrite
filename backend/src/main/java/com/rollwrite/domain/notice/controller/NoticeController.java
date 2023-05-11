package com.rollwrite.domain.notice.controller;

import com.rollwrite.domain.notice.dto.FindNoticeResDto;
import com.rollwrite.domain.notice.service.NoticeService;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = {"08. Notice-Controller (공지사항 관련)"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<ApiResponse> noticeList() {
        log.info("noticeList 호출");
        List<FindNoticeResDto> findNoticeResDtoList = noticeService.findNotice();
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.FIND_NOTICE_SUCCESS, findNoticeResDtoList), HttpStatus.OK);
    }

}
