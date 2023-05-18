package com.rollwrite.domain.inquiry.service;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.rollwrite.domain.inquiry.dto.AddInquiryReqDto;
import com.rollwrite.domain.inquiry.entity.Inquiry;
import com.rollwrite.domain.inquiry.repository.InquiryRepository;
import com.rollwrite.domain.notification.service.NotificationService;
import com.rollwrite.domain.user.entity.User;
import com.rollwrite.domain.user.repository.UserRepository;
import com.rollwrite.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InquiryService {

    private final FileService fileService;
    private final UserRepository userRepository;
    private final InquiryRepository inquiryRepository;
    private final NotificationService notificationService;

    @Transactional
    public void addInquiry(Long userId, AddInquiryReqDto addInquiryReqDto, MultipartFile image) throws IOException, FirebaseMessagingException {
        // 문의의 문장 길이가 400글자를 넘었을 때
        if (addInquiryReqDto.getInquiry().getBytes(StandardCharsets.ISO_8859_1).length > 400) {
            throw new IllegalArgumentException("문의 내용이 글자 수를 초과했습니다");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        String imageUrl = null;
        if (image != null && !image.isEmpty())
            imageUrl = fileService.fileUpload("inquiry", image);

        // inquiry insert
        Inquiry inquiry = Inquiry.builder()
                .user(user)
                .imageUrl(imageUrl)
                .content(addInquiryReqDto.getInquiry())
                .build();
        inquiryRepository.save(inquiry);

        // Admin Alarm
        notificationService.sendToAdmin(inquiry);
    }
}
