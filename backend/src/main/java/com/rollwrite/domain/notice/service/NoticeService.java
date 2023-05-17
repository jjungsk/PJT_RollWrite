package com.rollwrite.domain.notice.service;

import com.rollwrite.domain.notice.dto.FindNoticeResDto;
import com.rollwrite.domain.notice.entity.Notice;
import com.rollwrite.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<FindNoticeResDto> findNotice() {
        List<Notice> noticeList = noticeRepository.findAllByOrderByIdDesc();

        return noticeList.stream().map(notice -> FindNoticeResDto.builder()
                .notice(notice)
                .build()).collect(Collectors.toList());
    }

}
