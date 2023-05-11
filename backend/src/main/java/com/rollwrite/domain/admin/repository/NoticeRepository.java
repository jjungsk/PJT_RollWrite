package com.rollwrite.domain.admin.repository;

import com.rollwrite.domain.admin.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
