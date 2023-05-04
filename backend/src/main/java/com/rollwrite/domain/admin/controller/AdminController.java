package com.rollwrite.domain.admin.controller;

import com.rollwrite.domain.admin.dto.FindNoticeResDto;
import com.rollwrite.domain.admin.service.AdminService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/notice")
    public ResponseEntity<ApiResponse> noticeList() {
        log.info("noticeList 호출");
        List<FindNoticeResDto> findNoticeResDtoList = adminService.findNotice();
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.GET_NOTICE_SUCCESS, findNoticeResDtoList), HttpStatus.OK);
    }

    @PostMapping("/notice")
    public ResponseEntity<ApiResponse> addNotice(@ApiIgnore Authentication authentication, @RequestBody String content) {
        log.info("addNotice 호출");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        adminService.addNotice(userId, content);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_NOTICE_SUCCESS), HttpStatus.OK);
    }

    @PutMapping("/notice/{noticeId}")
    public ResponseEntity<ApiResponse> modifyNotice(@ApiIgnore Authentication authentication,
                                                    @PathVariable Long noticeId,
                                                    @RequestBody String content) {
        log.info("modifyNotice 호출");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        adminService.modifyNotice(userId, noticeId, content);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.MODIFY_NOTICE_SUCCESS), HttpStatus.OK);
    }

    @DeleteMapping("/notice/{noticeId}")
    public ResponseEntity<ApiResponse> removeNotice(@ApiIgnore Authentication authentication,
                                                    @PathVariable Long noticeId) {
        log.info("modifyNotice 호출");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        adminService.removeNotice(userId, noticeId);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.REMOVE_NOTICE_SUCCESS), HttpStatus.OK);
    }

}
