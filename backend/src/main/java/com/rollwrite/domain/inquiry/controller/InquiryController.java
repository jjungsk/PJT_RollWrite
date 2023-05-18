package com.rollwrite.domain.inquiry.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.rollwrite.domain.inquiry.dto.AddInquiryReqDto;
import com.rollwrite.domain.inquiry.service.InquiryService;
import com.rollwrite.global.auth.CustomUserDetails;
import com.rollwrite.global.model.ApiResponse;
import com.rollwrite.global.model.SuccessCode;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@Api(tags = {"07. Inquiry-Controller (문의사항 관련)"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/inquiry")
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping
    public ResponseEntity<ApiResponse> addInquiry(@ApiIgnore Authentication authentication,
                                                  @RequestPart AddInquiryReqDto addInquiryReqDto,
                                                  @RequestPart(required = false) MultipartFile image) throws IOException, FirebaseMessagingException {
        log.info("문의 생성 addInquiryReqDto : {}", addInquiryReqDto);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userId = userDetails.getUserId();
        inquiryService.addInquiry(userId, addInquiryReqDto, image);
        return new ResponseEntity<>(ApiResponse.success(SuccessCode.ADD_INQUIRY_SUCCESS), HttpStatus.OK);
    }

}

